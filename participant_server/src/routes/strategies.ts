import { URL } from "url";
import passport from "passport";
import { Strategy as OAuthStrategy } from "passport-oauth2";
import dotenv from "dotenv"
import request from "request"
import { Request } from "express";
import { createNew, IUser, User } from "../schema";

dotenv.config()

type PassportDone = (err: Error | null, user?: IUser | false, errMessage?: { message: string }) => void;
type PassportProfileDone = (err: Error | null, profile?: IProfile) => void;

interface IStrategyOptions {
    passReqToCallback: true; // Forced to true for our usecase
}

interface IOAuthStrategyOptions extends IStrategyOptions {
    authorizationURL: string;
    tokenURL: string;
    clientID: string;
    clientSecret: string;
}

interface IProfile {
    uuid: string;
    name: string;
    email: string;
    token: string;
}

export type AuthenticateOptions = passport.AuthenticateOptions & {
    callbackURL: string;
};

export class GroundTruthStrategy extends OAuthStrategy {
    public readonly url: string;

    constructor(url: string) {
        const secret = (process.env.GROUNDTRUTHSECRET);
        const id = (process.env.GROUNDTRUTHID);
        if (!secret || !id) {
            throw new Error(`Client ID or secret not configured in environment variables for Ground Truth`);
        }
        console.log('GroundTruthStrategy')
        let options: IOAuthStrategyOptions = {
            authorizationURL: new URL("/oauth/authorize", url).toString(),
            tokenURL: new URL("/oauth/token", url).toString(),
            clientID: id,
            clientSecret: secret,
            passReqToCallback: true
        };
        super(options, GroundTruthStrategy.passportCallback);
        this.url = url;
    }

    public userProfile(accessToken: string, done: PassportProfileDone) {
        (this._oauth2 as any)._request("GET", new URL("/api/user", this.url).toString(), null, null, accessToken, (err: Error | null, data: string) => {
            if (err) {
                done(err);
                return;
            }
            try {
                let profile: IProfile = {
                    ...JSON.parse(data),
                    token: accessToken,
                    points: 0
                };
                done(null, profile);
            }
            catch (err) {
                return done(err);
            }
        });
    }

    protected static async passportCallback(req: Request,  accessToken: string, refreshToken: string, profile: IProfile, done: PassportDone) {
        let user = await User.findOne({ uuid: profile.uuid });

        const GRAPHQLURL = process.env.GRAPHQLURL || 'https://registration.hack.gt/graphql';
        const GRAPHQLKEY = process.env.GRAPHQLAUTH || 'wow';
        // console.log(GRAPHQLKEY)

        if (!user) {
            let confirmed = false;
            const query = `
            query($search: String!) {
                search_user(search: $search, offset: 0, n: 1) {
                    users {
                        confirmed
                    }
                }
            }`;
            const variables = {
                search: profile.email
            };
            const options = { method: 'POST',
                url: GRAPHQLURL,
                headers:
                {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${Buffer.from(GRAPHQLKEY, "utf8").toString("base64")}`
                },
                body: JSON.stringify({
                    query,
                    variables
                })
            };

            await request(options, async (err:any, res:any, body:any) => {
                if (err) { return console.log(err); }
                if (JSON.parse(body).data.search_user.users.length > 0) {
                    confirmed = JSON.parse(body).data.search_user.users[0].confirmed;
                }
                // console.log(confirmed)
                // user = createNew<IUser>(User, {
                //         ...profile,
                //         visible: 1,
                //         points: 0,
                //         confirm: confirmed
                //     });
                // done(null, user)

                // if (!process.env.ISPRODUCTION || confirmed) {
                    // console.log(confirmed)
                user = createNew<IUser>(User, {
                    ...profile,
                    visible: 1,
                    points: 20,
                    confirm: confirmed
                });
                await user.save();
                done(null, user);
                // } else {
                //     done(null, undefined);
                // }
            });

        } else {
            user.token = accessToken;
            user.admin = false;
            await user.save();
            done(null, user);
        }


    }
}

function getExternalPort(req: Request): number {
    function defaultPort(): number {
        // Default ports for HTTP and HTTPS
        return req.protocol === "http" ? 80 : 443;
    }

    const host = req.headers.host;

    if (!host || Array.isArray(host)) {
        return defaultPort();
    }

    // IPv6 literal support
    const offset = host[0] === "[" ? host.indexOf("]") + 1 : 0;
    const index = host.indexOf(":", offset);

    if (index !== -1) {
        return parseInt(host.substring(index + 1), 10);
    }
    else {
        return defaultPort();
    }
}

export function createLink(req: Request, link: string): string {
    if (link[0] === "/") {
        link = link.substring(1);
    }
    if ((req.secure && getExternalPort(req) === 443) || (!req.secure && getExternalPort(req) === 80)) {
        return `http${req.secure ? "s" : ""}://${req.hostname}/${link}`;
    }
    else {
        return `http${req.secure ? "s" : ""}://${req.hostname}:${getExternalPort(req)}/${link}`;
    }
}
export type Profile = {
    userId?: string;
    email?: string;
    name: {
        first: string;
        middle: string;
        last: string;
    };
    phoneNumber: string;
    // gender: string;
    resume?: string;
    roles?: {
        member: boolean
        exec: boolean
        admin: boolean
    }
};
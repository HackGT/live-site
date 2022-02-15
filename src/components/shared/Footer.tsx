import React from "react";

import Instagram from "../../assets/social/insta.svg";
import Facebook from "../../assets/social/facebook.svg";
import Twitter from "../../assets/social/twitter.svg";
import GitHub from "../../assets/social/github.svg";
import Web from "../../assets/social/web.svg";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_socials">
          <a
            href="https://www.instagram.com/thehexlabs/"
            target="_blank"
            rel="noreferrer"
            className="footer_logo"
          >
            <img src={Instagram} alt="Instagram logo" />
          </a>
          <a
            href="https://www.facebook.com/TheHexLabs"
            target="_blank"
            rel="noreferrer"
            className="footer_logo"
          >
            <img src={Facebook} alt="Facebook logo" />
          </a>
          <a
            href="https://www.twitter.com/TheHexLabs"
            target="_blank"
            rel="noreferrer"
            className="footer_logo"
          >
            <img src={Twitter} alt="Twitter logo" />
          </a>
          <a
            href="https://www.github.com/HackGT"
            target="_blank"
            rel="noreferrer"
            className="footer_logo"
          >
            <img src={GitHub} alt="GitHub logo" />
          </a>
          <a
            href="https://www.hexlabs.org"
            target="_blank"
            rel="noreferrer"
            className="footer_logo"
          >
            <img src={Web} alt="Web logo" />
          </a>
        </div>
        <div className="footer_text_hex">Made with ♡ by HexLabs</div>
        <div>
          <a href="http://mlh.io/code-of-conduct" className="footer_text_mlh">
            MLH Code of Conduct
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

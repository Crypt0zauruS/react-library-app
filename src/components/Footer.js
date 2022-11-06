import React from "react";

const Footer = () => {
  return (
    <footer className="footer text-white bg-secondary mt-5">
      <div className="container p-3">
        <p>
          &copy; Copyright by Crypt0zauruS
          <span>
            {" "}
            Follow me on{" "}
            <a
              className="twitter"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/CryptosaurusRe4"
            >
              <i className="fab fa-twitter"></i>
            </a>{" "}
            and{" "}
            <a
              className="github"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Crypt0zauruS"
            >
              <i className="fab fa-github"></i>
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

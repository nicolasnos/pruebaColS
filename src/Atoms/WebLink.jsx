import React, { Children } from "react";

const WebLink = ({ linkString, children, className }) => {
  return (
    <a href={linkString} className={`${className}`}>
      {children}
    </a>
  );
};

export { WebLink };

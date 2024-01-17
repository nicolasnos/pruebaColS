import React from "react";

const WebLink = ({ linkString, linkText, className, target, time }) => {

    var className2 = `disabled-link`;
    
    if (time <= 0) {
        return (
            <a href={linkString} className={className}>{linkText}</a>
        );
    }

    return (
        <a href={linkString} className={`${className} ${className2}`}>{linkText}</a>
    );
}

export { WebLink };
import React from "react";

const ImageText=({ image, h2, text }) => {
    return(
        <div className="TextImage" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${image}")`}}>
            <h2>{h2}</h2>
            <p>{text}</p>
        </div>
    )
}

export default ImageText;
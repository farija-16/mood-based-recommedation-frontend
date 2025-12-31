import React from "react";
import "./flimstrip.css";

export default function FilmStrip( { posters = [], speed = "18s"}) {
    return (
        <div className="film-strip-container" style={ { "--speed": speed }}>
            <div className="film-strip">
                {posters.concat(posters).map((poster, i) => (
                    <div className="film-frame" key={i}>
                        <img src={poster} alt="poster" />
                        </div>
                ))}
            </div>
        </div>
    );

}
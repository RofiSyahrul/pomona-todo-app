import React from "react";
import "../stylesheets/star.css";

export default function Task({ title, isDone, priority }) {
  return (
    <>
      <div className="col-sm-7 col-12 text-left">
        <h4>{isDone ? <del>{title}</del> : title}</h4>
      </div>
      <div
        className="col-sm-3 col-7 text-left text-sm-right"
        style={{ fontSize: 13 }}
      >
        {isDone ? (
          <del>Priority: {priority.text}</del>
        ) : (
          <span>Priority: {priority.text}</span>
        )}
      </div>
      <div className="col-sm-2 col-5 text-left text-sm-right">
        <span className="stars">
          <span style={{ width: `${priority.number}rem` }} />
        </span>{" "}
      </div>
    </>
  );
}

import React from "react";
import "../stylesheets/star.css"

export default function Task({ title, isDone, priority }) {
  return (
    <>
      <div className="col-sm-8 col-12 text-left">
        <h3>{isDone ? <del>{title}</del> : title}</h3>
      </div>
      <div className="col-sm-4 col-12 text-left text-sm-right">
        {isDone ? (
          <del>Priority: {priority}</del>
        ) : (
          <span>Priority: {priority}</span>
        )}
      </div>
    </>
  );
}

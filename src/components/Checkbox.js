import React from "react";

export default function Checkbox({ id, isDone, toggleCheck, fontSize = 20 }) {
  return (
    <div className="pretty p-svg p-plain" style={{ fontSize }}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => toggleCheck(id)}
      />
      <div className="state">
        <img className="svg" src="/task.svg" alt="task" />
        <label>{" "}</label>
      </div>
    </div>
  );
}

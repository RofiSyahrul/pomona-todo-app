import React from "react";

export default function SelectInput({
  label = "",
  title = "",
  name = "",
  values = [],
  activeValue = "",
  onChange = () => {}
}) {
  return (
    <div className="form-group row">
      <label htmlFor={name} className="col-12 col-sm-5 col-form-label">
        {label}
      </label>
      <div className="col-12 col-sm-7">
        <select
          id={name}
          name={name}
          value={activeValue}
          className="form-control"
          title={title}
          onChange={onChange}
        >
          {values.map((value, i) => (
            <option key={i} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

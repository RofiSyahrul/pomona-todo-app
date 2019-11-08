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
      <label htmlFor={name} className="col-12 col-sm-6 col-form-label">
        {label}
      </label>
      <div className="col-12 col-sm-6">
        <select
          id={name}
          name={name}
          value={activeValue}
          className="form-control"
          title={title}
          onChange={onChange}
        >
          {values.map((value, i) => {
            return typeof value === "object" ? (
              <option key={i} value={value.value}>
                {value.label}
              </option>
            ) : (
              <option key={i} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

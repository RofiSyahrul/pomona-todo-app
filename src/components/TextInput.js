import React from "react";

export default function TextInput({
  type,
  name,
  label,
  value,
  onChange,
  autoFocus,
  required,
  autoComplete,
  readOnly
}) {
  const ro = Boolean(readOnly);
  return (
    <div className="form-label-group">
      <input
        type={type}
        id={name}
        className={`form-control${ro ? '-plaintext' : ''}`}
        placeholder={label}
        required={Boolean(required)}
        autoFocus={Boolean(autoFocus)}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        readOnly={ro}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

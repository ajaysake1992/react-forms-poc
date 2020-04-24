import React from "react";

const Input = ({name, label, value,error, onHandle}) => {
  return (
    <div className="fousernamerm-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onHandle}
        name={name}
        id={name}
        type="text"
        className="form-control"
      />
      { error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Input;

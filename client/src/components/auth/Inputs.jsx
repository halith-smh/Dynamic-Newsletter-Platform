import React from "react";

function Inputs({label, type, placeholder,value, onChange}) {
  return (
    <>
      <div className="inputs">
        <div className="mt-4">
          <label className="form-label">{label}</label>
          <input
            type={type}
            className="form-control"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
          />
        </div>
      </div>
    </>
  );
}

export default Inputs;

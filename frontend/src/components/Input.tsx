import React from "react";

interface Props {
  inputProps?: object;
  icon?: string;
  error?: string;
}

function Input({ icon, inputProps, error }: Props) {
  return (
    <div>
      {icon && <i className={icon}></i>}
      <input {...inputProps} autoComplete="off" />

      {error && (
        <i
          className="fas fa-exclamation-circle"
          style={{ color: "rgb(180, 0, 0)" }}
        ></i>
      )}
    </div>
  );
}

export default Input;

import React from "react";
import { DropdownList } from "react-widgets";

const RenderStatusField = ({
  input,
  name,
  label,
  status,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="My-Radio">
      {label}:
      <DropdownList
        {...input}
        name={name}
        data={status}
        value={input.value}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export default RenderStatusField
import React from "react";
import { DropdownList } from "react-widgets";

const RenderCategoriesField = ({
  input,
  name,
  label,
  categories,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="My-Radio">
      {label}:
      <DropdownList
        {...input}
        name={name}
        data={categories}
        value={input.value}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};


export default RenderCategoriesField;

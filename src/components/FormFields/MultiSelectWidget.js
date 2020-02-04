import React from 'react';
import { Multiselect } from "react-widgets";

const PresentersWidget = ({ input, name, label,  meta: { touched, error, warning } }) => {
    const { data } = this.props;

    return (
      <div className="My-Radio">
        {label}:
        <Multiselect
          {...input}
          name={name}
          data={data}
          onBlur={this.props.onBlur}
          value={input.value !== "[]" ? [...input.value] : "[]"}
        />
        {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
      </div>
    );
  };

  export default PresentersWidget;
import React from 'react'

const RenderTextField = ({input, label, type,  meta: { touched, error, warning }}) => {
  return (
      <div className="Small-Text">
          <label>{label}</label> <br/>
          <input {...input} className="text-field" onChange={input.onChange} placeholder={label} type={type} />
          {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
      </div>
  )
}

export default (RenderTextField)  
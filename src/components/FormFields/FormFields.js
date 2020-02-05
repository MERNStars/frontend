import React from "react";
import Moment from 'moment'
import {Image} from 'semantic-ui-react';
import { NumberPicker, DropdownList, Multiselect, DateTimePicker} from "react-widgets";
import ImageUploadPreviewer from "../FormFields/ImageUploadPreviewer";

// Contains Form Fields to be used in differnet forms

export class CustomFriendsFriend extends React.Component {
  render() {
    const {
      label,
      type,
      input,
      meta: { touched, error, warning }
    } = this.props;
    return (
      <div className="Small-Text">
        <label htmlFor={label}>{label}</label>
        <br />
        <input
          {...input}
          className="text-field"
          onChange={input.onChange}
          placeholder={label}
          type={type}
          id={label}
        />

        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  }
}

export function RenderTextField({
  input,
  className,
  label,
  type,
  meta: { touched, error, warning }
}) {
  return (
    <div className="Small-Text">
      <label htmlFor={label}>{label}</label> <br />
      <input
        {...input}
        className={className}
        onChange={input.onChange}
        placeholder={label}
        type={type}
        id={label}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
}

export function RenderSmallTextField ({
  input,
  className,
  label,
  type,
  meta: { touched, error, warning }
}) {
  return (
    <div className="Small-Text">
      <label>{label}</label>
      <input
        {...input}
        className={className}
        onChange={input.onChange}
        placeholder={label}
        type={type}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export function RenderCheckBox ({
  input,
  className,
  label,
  type,
  meta: { touched, error, warning }
}) {
  return (
    <div className="Small-Text">
      <label>{label}</label>
      <input
        {...input}
        className={className}
        onChange={input.onChange}
        placeholder={label}
        type={type}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export function RenderTextArea ({
  input,
  className,
  label,
  type,
  meta: { touched, error, warning }
}) {
  return (
    <div className="Small-Text">
      <label>{label}</label> <br />
      <textarea
        {...input}
        className={className}
        onChange={input.onChange}
        placeholder={label}
        type={type}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};



export const renderPresentersField = ({ input, name, label, presenters, onBlur }) => {
  let emptyArray = [];
  presenters.map(presenter => {
    emptyArray.push({
      id: presenter._id,
      name: `${presenter.first_name} ${presenter.last_name} ${presenter.qualification}`
    });
  });
  return (
    <>
      {label}:
      <Multiselect
        {...input}
        name={name}
        data={emptyArray}
        textField="name"
        onBlur={onBlur}
        value={input.value !== "[]" ? [...input.value] : "[]"}
      />
    </>
  );
};

export const RenderImageField = ({
  input,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="image-file">
      <ImageUploadPreviewer
        {...input}
        onChange={input.onChange}
        type="file"
        value={input.value ? input.value[0] : ""}
        defaultValue={<Image size='small' src={require('../../assets/user.svg')}></Image>}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export const RenderCategoriesField = ({
  input,
  name,
  label,
  categories,
  className,
  meta: { touched, error, warning }
}) => {
  return (
    <div>
      <label>{label}</label> <br />
      <DropdownList
        {...input}
        name={name}
        data={categories}
        value={input.value}
        className={className}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export function renderAgeNumberPicker({
  input,
  name,
  label,
  className,
  meta: { touched, error, warning }
}) {
  return (
    <div>
      <label>{label}</label>
      <NumberPicker
        {...input}
        name={name}
        format="###"
        min={13}
        max={150}
        value={input.value !== "" ? Number.parseInt(input.value) : 18}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
}

export function renderSexCombobox({
  input,
  name,
  label,
  sexes,
  className,
  meta: { touched, error, warning }
}) {
  return (
    <div>
      <label>{label}</label> <br />
      <DropdownList {...input} name={name} data={sexes} value={input.value} className={className} placeholder={sexes[0]} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
}

export function renderReligiousCombobox ({ input, name, label, religions, className }) {
  return (
    <div>
      <label>{label}</label> <br />
      <DropdownList
        {...input}
        name={name}
        data={religions}
        value={input.value}
        className={className}
        placeholder={religions[0]}
      />
    </div>
  );
}

export function RenderUneditableTextField({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) {
  return (
    <div className="Small-Text">
      <label>{label}</label> <br />
      <input
        {...input}
        className="text-field"
        onChange={input.onChange}
        placeholder={label}
        type={type}
        disabled={true}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export function renderInterestMultiSelects({
  input,
  name,
  label,
  categories,
  onBlur,
  className
}) {
  return (
    <div>
      <label>{label}</label> <br />
      <Multiselect
        {...input}
        className={className}
        name={name}
        data={categories}
        onBlur={onBlur}
        value={input.value !== "[]" ? [...input.value] : "[]"}
        placeholder={categories[0]}
      />
    </div>
  );
}

export const RenderStatusField = ({
  input,
  name,
  label,
  status,
  meta: { touched, error, warning }
}) => {
  return (
    <div className="My-Radio">
      {label}:
      <DropdownList {...input} name={name} data={status} value={input.value} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

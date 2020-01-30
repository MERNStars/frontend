import React from "react";
import { Field, reduxForm } from "redux-form";
import UploadImageForm from "../UploadImageForm";
import validate from '../FormFields/validate'
import { connect } from "react-redux";
import ImageUploadPreviewer from '../ImageUploadPreviewer';
import { setNewImage } from "../../reducers/event_reducer";

function mapStateToProps(state) {
  return {
    newImage: state.eventReducer.newImage
  };
}


const mapDispatchToProps = dispatch => {
  return {
    newImage: fileData => {
      dispatch(setNewImage(fileData));
    }
  };
};


const RenderTextField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const RenderImageField = ({input, meta: {touched, error, warning}}) =>{
    
  return <div className="image-file">
     <ImageUploadPreviewer {...input} onChange={input.onChange} type="file" value={input.value? input.value[0] : "" } />
    {touched &&
    ((error && <span>{error}</span>) ||
      (warning && <span>{warning}</span>))}
  </div>
}

class WizardFormThirdPage extends React.Component{
  state = {
    image_file: ""
  }

  onChange = (e) => {
    if(e.target.files[0]){
        this.setState({image_file: URL.createObjectURL(e.target.files[0])});
        this.props.newImage(e.target.files[0]);
    }
  }

  render(){
    const { handleSubmit, pristine, previousPage, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="images" component={RenderImageField} onChange={this.onChange} type="file" />
        <Field
          name="published"
          component={RenderTextField}
          type="checkbox"
          label="Published"
        />
        <div>
          <button type="button" className="previous" onClick={previousPage}>
            Previous
          </button>
          <button type="submit" disabled={pristine || submitting}>
            Preview
          </button>
        </div>
      </form>
    );
  }
};
export default reduxForm({
  form: "wizard",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(connect(mapStateToProps, mapDispatchToProps)(WizardFormThirdPage));

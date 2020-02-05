import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "../../FormFields/validate";
import { connect } from "react-redux";
import { setNewImage } from "../../../reducers/event_reducer";
import {RenderTextField, RenderImageField} from '../../FormFields/FormFields'
import styles from '../../../styles/form.module.scss';

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

class WizardFormThirdPage extends React.Component {
  state = {
    image_file: null
  };

  onChange = e => {
    if (e.target.files[0]) {
      this.setState({ image_file: URL.createObjectURL(e.target.files[0]) });
      this.props.newImage(e.target.files[0]);
    }
  };

  render() {
    const { handleSubmit, pristine, previousPage, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="images"
          component={RenderImageField}
          onChange={this.onChange}
          type="file"
        />
        <Field
          name="published"
          component={RenderTextField}
          type="checkbox"
          label="Published"
        />
        <div>
          <button type="button" className={styles.NextButton} id={styles.PreviousButton} onClick={previousPage}>
            Previous
          </button>
          <button type="submit" className={styles.NextButton} disabled={pristine || submitting}>
            Create Event
          </button>
        </div>
      </form>
    );
  }
}
export default reduxForm({
  form: "wizard",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(connect(mapStateToProps, mapDispatchToProps)(WizardFormThirdPage));

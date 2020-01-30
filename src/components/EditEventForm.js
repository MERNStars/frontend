import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import RenderTextField from "./RenderTextField";
// import RenderPresentersField from "./RenderPresentersField";
import { connect } from "react-redux";
import { DropdownList, Multiselect } from "react-widgets";
import ImageUploadPreviewer from './ImageUploadPreviewer';
import { setNewImage } from "../reducers/event_reducer";

function mapStateToProps(state) {
  return {
    categories: state.eventReducer.event_categories,
    status: state.eventReducer.event_statuses,
    events: state.eventReducer.events,
    presenters: state.presenterReducer.presenters,
    newImage: state.eventReducer.newImage
  };
}

class EditEventForm extends Component {

    state = {
        //loading the detail of the event from the store
        event: {},
        image_file: null
    }

    componentDidMount(){
        const {index, events} = this.props;
        this.setState({event: {...events[index], image_file: events[index].images[0]}});
    }

  RenderCategoriesField = ({
    input,
    name,
    label,
    meta: { touched, error, warning }
  }) => {
    const { categories } = this.props;
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

  RenderStatusField = ({
    input,
    name,
    label,
    meta: { touched, error, warning }
  }) => {
    const { status } = this.props;
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

  renderEventName = ({input, name, label, meta: {touched, error, warning}
  }) => {
      return (<><label>{label}</label> <br/>
          <input {...input} className="text-field" onChange={input.onChange} placeholder={label} />
          {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}</>);
  };

  renderPresenterDropdown = ({input, name, label, meta: {touched, error, warning}}) => {
    
    const presentereData = this.props.presenters.map( (presenter) => {
        return { "id": presenter['_id'], "name": `${presenter.first_name} ${presenter.last_name}`}
    });

    return (
      <div className="My-Radio">
        {label}:
        <Multiselect
          {...input}
          data={presentereData}
          valueField="id"
          textField="name"
          onBlur={this.props.onBlur}
          value={input.value !== "[]" ? [...input.value] : "[]"}
        />
      </div>
    );
  }

  RenderUneditableTextField = ({input, label, type,  meta: { touched, error, warning }}) => {
    return (
      <div className="Small-Text">
          <label>{label}</label> <br/>
          <input {...input} className="text-field" onChange={input.onChange} placeholder={label} type={type} disabled={true} />
          {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
      </div>
      )
  }

  onChange = (e) => {
    //   console.log(e.target.files[0]);
    if(e.target.files[0]){
        this.setState({image_file: URL.createObjectURL(e.target.files[0])});
        this.props.newImage(e.target.files[0]);
    }
  }

  RenderImageField = ({input, meta: {touched, error, warning}}) =>{
    
    return <div className="image-file">
       <ImageUploadPreviewer {...input} onChange={input.onChange} type="file" value={input.value? input.value[0] : "" } />
      {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
    </div>
  }

  render() {
    return (
      <div>
        <h1>Edit Event Detail</h1>
        <form onSubmit={this.props.handleSubmit}>
          <Field
            name="_id"
            component={this.RenderUneditableTextField}
            type="text"
            label="Event ID"
            props={{
                disabled: true, // like this
              }}
          />
          <Field
            name="event_name"
            component={RenderTextField}
            type="text"
            label="Event Name"
          />
          <Field
            name="description"
            component={RenderTextField}
            type="textarea"
            label="Description" 
          />
          <Field
            name="event_date"
            component={RenderTextField}
            type="date"
            label="Event Date"
          />
          <Field
            name="event_start_time"
            component={RenderTextField}
            type="time"
            label="Event Start Time"
          />
          <Field
            name="event_end_time"
            component={RenderTextField}
            type="time"
            label="Event End Time"
          />
          <Field
            name="registration_closed_date"
            component={RenderTextField}
            type="date"
            label="Registration close date"
          />
          <Field
            name="presenters"
            component={this.renderPresenterDropdown}
            type="text"
            label="Presenters"
          />
          <Field
            name="is_family_friendly"
            component={RenderTextField}
            type="checkbox"
            label="Family Friendly"
          />
          <Field
            name="minimum_age"
            component={RenderTextField}
            type="number"
            label="Minimum Age"
          />
          <Field
            name="event_category"
            component={this.RenderCategoriesField}
            type="text"
            label="Event Category"
          />
          <Field
            name="status"
            component={this.RenderStatusField}
            type="text"
            label="Status"
          />
          
         <Field name="images" component={this.RenderImageField} onChange={this.onChange} type="file" />

          <Field
            name="event_capacity"
            component={RenderTextField}
            type="number"
            label="Event Capacity"
          />
          <Field
            name="published"
            component={RenderTextField}
            type="checkbox"
            label="Published"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newImage: fileData => {
      dispatch(setNewImage(fileData));
    }
  };
};

export default reduxForm({
  form: "CreateEventForm"
})(connect(mapStateToProps, mapDispatchToProps)(EditEventForm));

import React, { Component } from "react";
import EditEventForm from "../components/EditEventForm";
import { editEvent } from "../reducers/event_reducer";
import { connect } from "react-redux";

// import {loadPresenters} from '../reducers/presenter_reducer';

function mapStateToProps(state) {
  return {
    categories: state.eventReducer.event_categories,
    status: state.eventReducer.event_statuses,
    events: state.eventReducer.events,
    presenters: state.presenterReducer.presenters
  };
}

class EditEvent extends Component {
  state = {
    display_message: "Edit Event",
    event: null,
    index: this.props.match.params.index
  };

  submit = data => {
    // console.log("Submitting...");
    const event = JSON.parse(JSON.stringify(data));
    const presenters = event.presenters.map(presenter => presenter.id);

    if(presenters.length > 0){
      event.presenters = presenters;
    }
    // const date_parts = event.event_date.split('/');
    // console.log("Date format");
    
    // console.log(date_parts);
    
    const event_date = { 
      begin: `${event.event_date}T${event.event_start_time}`,
      end: `${event.event_date}T${event.event_end_time}`
    };
    
    event.event_date = event_date;
    if(event.registration_closed_date.split("T").length < 1)
      event.registration_closed_date = `${event.registration_closed_date}T23:55:55`;
    console.log(event);
    this.props.editEvent(event);
    // console.log("Submit end...");
    this.setState({
      display_message: "Your event has been updated."
    });
  };

  componentDidMount(){
      const {index} = this.props.match.params;
      let event = JSON.parse(JSON.stringify({...this.props.events[index]}));
      let event_dates = event.event_date;
      const event_date = event_dates.begin.split("T")[0];
      const event_start_time = event_dates.begin.split("T")[1];
      const event_end_time = event_dates.end.split("T")[1];
      event.event_date = event_date;
      event.event_start_time = event_start_time;
      event.event_end_time = event_end_time;
      event.registration_closed_date = event.registration_closed_date.split("T")[0];
      const presentereData = [];
      this.props.presenters.forEach(presenter => {
        if(event.presenters.includes(presenter._id)){
          presentereData.push({ "id": presenter['_id'], "name": `${presenter.first_name} ${presenter.last_name}`});
      }});
     event.presenters = presentereData;

      this.setState({index: index, event: event});
      
  }

  render() {
    return (      
        <EditEventForm index={this.state.index} onSubmit={this.submit} initialValues={this.state.event} />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editEvent: eventData => {
      dispatch(editEvent(eventData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);

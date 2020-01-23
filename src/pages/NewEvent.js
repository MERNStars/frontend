import React, { Component } from 'react'
import {connect} from 'react-redux';
import UploadImageForm from '../components/UploadImageForm';

function mapStateToProps(state){
    return {message: state.userReducer.message, userLoggedIn: state.userReducer.userLoggedIn}
}

class NewEvent extends Component {

  render() {
  return <UploadImageForm />;
  }
}


export default connect(mapStateToProps)(NewEvent);
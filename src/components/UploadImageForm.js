import React, {Component} from 'react'
import axios from 'axios';
import { BASE_URL } from "../reducers/config";
require("dotenv").config();

class UploadImageForm extends Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit = (e) => {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }

    //when a new file has been chosen
    //call this method
  onChange = (e) => {
    this.setState({file:e.target.files[0]})
  }


  fileUpload = async (file) => {

    const option = {
        method: "GET",
        headers: {
        authorization: `${localStorage.weexplore_token}`
         },
        url: `${BASE_URL}/image/geturl`
    }
    
    const response = await axios(option)
    .catch(error => {
      console.log(`ERROR: ${error}`);
    });
    
    
    const url = await response.data.data;
    console.log(url);
    // const formData = new FormData();
    // formData.append('file',file)
    const config = {
        method: "POST",
        headers: {
        'Access-Control-Allow-Methods': 'POST',
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: file,
        url: url
    }
    return  axios(config);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}



export default UploadImageForm
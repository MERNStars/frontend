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
    this.fileUpload(this.state.file);
  }

    //when a new file has been chosen
    //call this method
  onChange = (e) => {
    this.setState({file:e.target.files[0]})
  }


  fileUpload = async (file) => {

    
    // console.log(url);
    const fileParts = file.name.split('.');
    const fileType = fileParts[fileParts.length - 1];

    const option = {
        headers: {
        authorization: `${localStorage.weexplore_token}`
         }
    }
    
    const response = await axios.post(`${BASE_URL}/image/geturl`, { file_type: fileType }, option )
    .catch(error => {
      console.log(`ERROR: ${error}`);
    });

    const url = await response.data.data;
    
    console.log("File type: " + fileType);
    const config = {
        headers: {
        'Content-Type': fileType
        }
    }
    axios.put(url, file, config)
    .then((response)=>{
      console.log(response.data);
    })
    .catch(err=>console.error("Awww! " + err));
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
import React, {Component} from 'react'
import S3 from 'react-aws-s3';
const { uuid } = require('uuidv4');

require("dotenv").config();

class UploadImageForm extends Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null,
      config: {
          bucketName: 'weexplore2020',
          dirName: 'images',
          region: 'ap-southeast-2',
          accessKeyId: process.env.REACT_APP_AWS_EXPLORER_ID,
          secretAccessKey: process.env.REACT_APP_AWS_EXPLORER_SKEY
      }
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit = (e) => {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file);
  }
  onChange = (e) => {
    console.log(e.target.files[0]);
    if(e.target.files[0])
        this.setState({file: e.target.files[0]});
  }

  fileUpload = (file) => {
    const ReactS3Client = new S3(this.state.config);
    const newFileName = `${uuid()}`;

    ReactS3Client
    .uploadFile(file, newFileName)
    .then(data => console.log(data))
    .catch(err => console.error(err));
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        { this.state.file? <img src={URL.createObjectURL(this.state.file)} alt="Event Avatar" width="100px" /> : null }
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
   )
  }
}

export default UploadImageForm
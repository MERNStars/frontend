import React, {Component} from 'react'

class UploadImageForm extends Component {

  constructor(props) {
    super(props);
    this.state ={
      file:this.props.value[0],
    }
    // this.onChange = this.onChange.bind(this)
  }

  render() {
      console.log("Upload image form props...");
      console.log(typeof(this.props.value));
      console.log(this.props.value);
      
      
    return (
      <div>
        <h1>File Upload</h1> {/* URL.createObjectURL */}
        { <p><img src={typeof(this.props.value)==="string"? this.props.value : URL.createObjectURL(this.props.value)} alt="Event Avatar" width="300px" /><br/></p>}
        <input name={this.props.name} type={this.props.type} onChange={this.props.onChange} /*value={this.props.value? this.props.value[0]:""}*/ />
      </div>
   )
  }
}

export default UploadImageForm
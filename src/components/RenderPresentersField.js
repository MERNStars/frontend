import React from "react";
import axios from "axios";
import { Multiselect } from "react-widgets";

export default class RenderPresentersField extends React.Component {
  state = {
    presenters: []
  };

  async componentDidMount() {
    const response = await axios
      .get("http://localhost:8888/presenters/", {
        headers: {
          authorization: `${localStorage.weexplore_token}`
        }
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });

    const data = await response.data;
    // this.setState({ presenters: data });
    // const { presenters } = this.state;
    const newData = [];
    let Extra = data
      ? data.map(presenter => {
          newData.push(presenter._id);
        })
      : null;
    return this.setState({presenters: newData})
  }

  render() {
    const { name, input, label } = this.props;
    return (
      <div className="My-Radio">
      {label}:
      <Multiselect
        {...input}
        name={name}
        data={this.state.presenters}
        onBlur={this.props.onBlur}
      />
    </div>
    );
  }
}

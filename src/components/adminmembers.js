import React, { Component } from "react";
import axios from "axios";

class AdminMembers extends Component {
  state = {
    members: []
  };

  async componentDidMount() {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `${localStorage.weexplore_token}`
      },
      url: "https://weexplorebackend.herokuapp.com/users"
    };
    const response = await axios(options).catch(error => {
      console.log(`ERROR: ${error}`);
    });

    console.log(response);
    const data = await response.data;
    this.setState({ members: data });
    console.log(this.state.members);
  }

  render() {
    return (
      <div>
        <h1>Members</h1>
        {this.state.members
          ? this.state.members.map((member, i) => {
              return (
                <div index={i}>
                  <ul>
                    <li>{member.username}</li>
                    <li>{member.first_name}</li>
                    <li>{member.last_name}</li>
                    <li>{member.age}</li>
                  </ul>
                </div>
              );
            })
          : <div> No Data </div>}
      </div>
    );
  }
}

export default AdminMembers;

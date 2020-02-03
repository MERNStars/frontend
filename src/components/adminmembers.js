import React, { Component } from "react";
import axios from "axios";
import { Table } from "semantic-ui-react";
require("dotenv").config();

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
      url: `${process.env.REACT_APP_BACKEND_DB_URL}/users`
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
        <Table>
          <Table.Header>
            <Table.HeaderCell>Member</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Gender</Table.HeaderCell>
            <Table.HeaderCell>Interests</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
          {this.state.members
          ? this.state.members.map((member, i) => {
              return (
                <Table.Row>
                  <Table.Cell>{member.first_name} {member.last_name}</Table.Cell>
                  <Table.Cell>{member.age}</Table.Cell>
                  <Table.Cell>{member.sex}</Table.Cell>
                  <Table.Cell>{member.interests.map( (interest) => {
                    return (<li>{interest}</li>)})}</Table.Cell>
                  <Table.Cell>{member.username}</Table.Cell>
                </Table.Row>)}):null}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default AdminMembers;

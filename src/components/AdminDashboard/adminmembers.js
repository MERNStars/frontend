import React, { Component } from "react";
import { Table, Statistic } from "semantic-ui-react";
import Axios from "axios";
require("dotenv").config();

class AdminMembers extends Component {
  state = {
    members: []
  };

  componentDidMount() {
    Axios.get(`${process.env.REACT_APP_BACKEND_DB_URL}/users`, {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        authorization: `${localStorage.weexplore_token}`
      }
    }).then(response => {
      this.setState({ members: response.data });
      console.log(this.state.members);
    });
  }

  render() {
    return (
      <div>
        <h1>Members</h1>
        <Table color="green" striped>
          <Table.Header>
            <Table.HeaderCell textAlign="center">Member</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Age</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Gender</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Interests</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Email</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            {this.state.members
              ? this.state.members.map((member, i) => {
                  return (
                    <Table.Row textAlign="center">
                      <Table.Cell>
                        {member.first_name} {member.last_name}
                      </Table.Cell>
                      <Table.Cell>{member.age}</Table.Cell>
                      <Table.Cell>{member.sex}</Table.Cell>
                      <Table.Cell verticalAlign="top">
                        {member.interests.map(interest => {
                          return (
                            <>
                              {`${interest} `}
                              <br />
                            </>
                          );
                        })}
                      </Table.Cell>
                      <Table.Cell>{member.username}</Table.Cell>
                    </Table.Row>
                  );
                })
              : null}
          </Table.Body>
        </Table>
        <Statistic size="small" horizontal>
          <Statistic.Value>
            {this.state.members ? this.state.members.length : null}
          </Statistic.Value>
          <Statistic.Label>Members</Statistic.Label>
        </Statistic>
      </div>
    );
  }
}

export default AdminMembers;

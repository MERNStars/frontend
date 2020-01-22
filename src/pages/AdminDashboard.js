import React, { Component } from "react";
import axios from "axios";
import AdminEvent from "../components/adminevents";
import AdminMembers from "../components/adminmembers";
import { Sidebar, Segment, Menu, Grid } from "semantic-ui-react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { isAdmin: state.userReducer.isAdmin };
}

function AdminDisplay(props) {
  const pageStatus = props.pageStatus;
  if (pageStatus === "events") {
    return <AdminEvent events={props.events} />;
  }
  return <AdminMembers />;
}

class AdminDashboard extends Component {
  state = {
    events: [],
    pageStatus: "events"
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ pageStatus: "members" });
  };

  handleClick2 = e => {
    e.preventDefault();
    this.setState({ pageStatus: "events" });
  };

  async componentDidMount() {
    const response = await axios
      .get("https://weexplorebackend.herokuapp.com/events")
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });
    const data = await response.data;
    this.setState({ events: data });
  }

  renderAdminPage() {
    console.log(this.props.isAdmin)
    // if (this.props.isAdmin) {
      const { events, pageStatus } = this.state;
      console.log(pageStatus);
      return (
        <>
          <Grid columns={2} divided>
            <Grid.Row></Grid.Row>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <div>
                <button onClick={this.handleClick2}>Events</button>
                <br />
                <button onClick={this.handleClick}>Members</button>
              </div>

              <Grid.Column width={10}>
                <AdminDisplay
                  page={true}
                  events={events}
                  pageStatus={pageStatus}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      );
    // } else {
    //   return <h1>You are not authorised to view this page</h1>;
    // }
  }

  render() {
    return this.renderAdminPage();
  }
}

export default connect(mapStateToProps)(AdminDashboard);

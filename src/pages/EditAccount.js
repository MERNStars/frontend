import React from "react";
import Axios from "axios";
import EditUsersForm from "../components/Users/EditUsersForm";

require("dotenv").config();

let submit = data => {
  console.log(data);
  Axios.patch(`${process.env.REACT_APP_BACKEND_DB_URL}/users/update`, data, {
    headers: {
      authorization: `${localStorage.weexplore_token}`
    }
  })
    .then(response => console.log(response))
    .catch(error => console.log("error:" + error));
};

class EditAccountDetails extends React.Component {
  state = {
    userDetail: {},
    loading: true,
    initialValues: {}
  };

  componentDidMount() {
    Axios.get(
      `${process.env.REACT_APP_BACKEND_DB_URL}/users/${localStorage.username}`,
      {
        headers: {
          authorization: `${localStorage.weexplore_token}`
        }
      }
    ).then(response =>
      this.setState({
        userDetail: {
          username: response.data.username,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          age: response.data.age,
          sex: response.data.sex,
          religion: response.data.religion,
          interests: response.data.interests
        },
        loading: false
      })
    );
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <div>
        <EditUsersForm
          onSubmit={submit}
          initialValues={this.state.userDetail}
        />
      </div>
    );
  }
}
export default EditAccountDetails;

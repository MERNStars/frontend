require("dotenv").config();

function AdminAccounts() {
  const localAdmin = localStorage.username;
  if (
    localAdmin === process.env.REACT_APP_ADMIN_ACC_1 ||
    localAdmin === process.env.REACT_APP_ADMIN_ACC_2 ||
    localAdmin === process.env.REACT_APP_ADMIN_ACC_3 ||
    localAdmin === process.env.REACT_APP_ADMIN_ACC_4
  ) {
    return true;
  } else {
    return false;
  }
}

export default AdminAccounts;

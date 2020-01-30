function AdminAccounts() {
  const localAdmin = localStorage.username;
  if (
    localAdmin === "christophertri90@gmail.com" ||
    localAdmin === "jackptoke@gmail.com" ||
    localAdmin === "darrel.wah@gmail.com" ||
    localAdmin === "isabellepeskett@gmail.com"
  ) {
    return true;
  } else {
    return false;
  }
}

export default AdminAccounts;

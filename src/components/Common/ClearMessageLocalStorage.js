import { NotificationManager } from "react-notifications";

// Function to remove Message from localStorage after reload
const ClearMessageLocalStorage = () => {
  if(localStorage.message) {
    NotificationManager.info(null, localStorage.message);
    localStorage.removeItem("message");
  }
}

export default ClearMessageLocalStorage
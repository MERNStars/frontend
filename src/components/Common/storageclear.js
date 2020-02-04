import { NotificationManager } from "react-notifications";

const storageClear = () => {
  if(localStorage.message) {
    NotificationManager.info(null, localStorage.message);
    localStorage.removeItem("message");
  }
}

export default storageClear
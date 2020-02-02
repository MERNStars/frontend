import {NotificationManager} from 'react-notifications';

const initialState = {
  title: "",
  message: ""
}

export const createNotification = (notification) => {
  return {
      type: "NOTIFICATION_CHANGE",
      data: notification
  }
}


const notificationReducer = (state=initialState, action) => {
  let newState = {};
    switch(action.type){
        case "NOTIFICATION_CHANGE":
          console.log(action.data)
            newState = { ...state, message: action.message, title: action.title };
            sendNotification("success")
            default:
            newState = { ...state};
            break;
    }
    return newState;
}


const sendNotification = (type) => {
  return () => {
    switch (type) {
      case 'info':
        NotificationManager.info('Info message');
        break;
      case 'success':
        NotificationManager.success("this.state.message", "this.state.title");
        break;
      case 'warning':
        NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        break;
      case 'error':
        NotificationManager.error('Error message', 'Click me!', 5000, () => {
          alert('callback');
        });
        break;
    }
  };
};

export default notificationReducer
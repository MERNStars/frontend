import {NotificationManager} from 'react-notifications';

const createNotification = (type) => {
  return () => {
    switch (type) {
      case 'info':
        console.log("test")
        NotificationManager.info('Info message');
        break;
      case 'success':
        NotificationManager.success('Test message', 'Close after 3000ms');
        console.log("test")
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

export default createNotification
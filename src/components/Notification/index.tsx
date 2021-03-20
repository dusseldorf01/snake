import ReactDOM from 'react-dom';
import Notification from './Notification';
import {
  INotification,
  NotificationType,
} from './interfaces';
import css from './index.css';

const NOTIFICATIONS_ID = 'notifications';

const renderMessage = (Component: JSX.Element) => {
  const container = document.getElementById(NOTIFICATIONS_ID) || document.createElement('div');

  if (!container.parentNode) {
    container.setAttribute('id', NOTIFICATIONS_ID);
    container.classList.add(css.notificationsList);
    document.body.appendChild(container);
  }

  const notification = document.createElement('div');
  container.appendChild(notification);

  ReactDOM.render(Component, notification);
};

const notification = {
  error: ({
    duration,
    message,
  }: Omit<INotification, 'type'>) => {
    renderMessage(
      <Notification
        duration={duration}
        message={message}
        type={NotificationType.ERROR}
      />,
    );
  },
  success: ({
    duration,
    message,
  }: Omit<INotification, 'type'>) => {
    renderMessage(
      <Notification
        duration={duration}
        message={message}
        type={NotificationType.SUCCESS}
      />,
    );
  },
};

export default notification;

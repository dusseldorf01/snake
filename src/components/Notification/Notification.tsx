import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import type { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import {
  INotification,
  NotificationType,
} from './interfaces';
import css from './index.css';

const typeClassNames: Record<NotificationType, string> = {
  [NotificationType.ERROR]: css.notificationError,
  [NotificationType.SUCCESS]: css.notificationSuccess,
};

const transitionClassNames: Partial<Record<keyof CSSTransitionClassNames, string>> = {
  enter: css.notificationEnter,
  enterActive: css.notificationEnterActive,
  exit: css.notificationExit,
  exitActive: css.notificationExitActive,
};

const Notification = ({
  duration = 3000,
  message,
  type,
}: INotification) => {
  const [isVisible, isVisibleHandler] = useState<boolean>(false);
  const closeModal = useCallback(() => isVisibleHandler(false), []);

  useEffect(() => {
    isVisibleHandler(true);

    if (duration !== 0) {
      setTimeout(() => {
        isVisibleHandler(false);
      }, duration);
    }
  }, []);

  return (
    <CSSTransition
      classNames={transitionClassNames}
      in={isVisible}
      timeout={400}
      unmountOnExit
    >
      <div className={classnames(css.notification, typeClassNames[type])}>
        {message}
        <button
          aria-label="Скрыть уведомление"
          type="button"
          className={css.notificationButton}
          onClick={closeModal}
        />
      </div>
    </CSSTransition>
  );
};

export default Notification;

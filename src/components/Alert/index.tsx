import { ReactNode } from 'react';
import css from './index.css';

interface AlertProps {
  children: ReactNode
}

const Alert = ({ children }: AlertProps) => (
  <div className={css.alert}>{children}</div>
);

export default Alert;

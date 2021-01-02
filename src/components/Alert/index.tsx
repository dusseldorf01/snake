import { ReactNode } from 'react';
import './index.css';

interface AlertProps {
  children: ReactNode
}

const Alert = ({ children }: AlertProps) => (
  <div className="alert">{children}</div>
);

export default Alert;

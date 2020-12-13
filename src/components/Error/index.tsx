import { FunctionComponent } from 'react';
import { IError } from './interfaces';
import './index.css';

const Error: FunctionComponent<IError> = ({
  linkHref = '/',
  linkLabel = 'Назад на главную',
  title = 'Ошибка',
}: IError) => (
  <div className="error">
    <h1 className="error__title">{title}</h1>
    <a href={linkHref} className="error__link">{linkLabel}</a>
  </div>
);

export default Error;

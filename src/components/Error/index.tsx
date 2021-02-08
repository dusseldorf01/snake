import { IError } from './interfaces';
import css from './index.css';

const Error = ({
  description,
  linkHref = '/',
  linkLabel = 'Назад на главную',
  title = 'Ошибка',
}: IError) => (
  <div className={css.error}>
    <h1 className={css.errorTitle}>{title}</h1>
    {description && (
      <div className={css.errorDescription}>
        {description}
      </div>
    )}
    <a href={linkHref} className={css.errorLink}>{linkLabel}</a>
  </div>
);

export default Error;

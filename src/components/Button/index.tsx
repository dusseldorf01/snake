import { IButton } from './interfaces';
import css from './index.css';

const Button = ({
  disabled,
  label,
  onClick,
  type = 'submit',
}: IButton) => (
  <button
    className={css.button}
    disabled={disabled}
    onClick={onClick}
    // eslint-disable-next-line react/button-has-type
    type={type}
  >
    {label}
  </button>
);

export default Button;

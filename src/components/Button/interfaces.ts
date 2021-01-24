export interface IButton {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
}

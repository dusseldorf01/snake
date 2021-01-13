import gameConfig from '@/game/config';
import { IGameModal } from './interfaces';
import './index.css';

const {
  BOARD_HEIGHT,
  BOARD_WIDTH,
} = gameConfig;

const GameModal = ({
  buttons,
  children,
  title,
}: IGameModal) => (
  <div
    className="game-modal-wrapper"
    style={{ width: BOARD_WIDTH + 2, height: BOARD_HEIGHT + 2 }}
  >
    <div className="game-modal">
      <h2 className="game-modal__title">{title}</h2>
      {children && (
        <div className="game-modal__content">
          {children}
        </div>
      )}
      <div className="game-modal-button-group">
        {buttons.map(({ label, onClick }, index) => (
          <button
            key={label}
            className="game-modal-button-group__item"
            onClick={onClick}
            type={index === 0 ? 'submit' : 'button'}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default GameModal;

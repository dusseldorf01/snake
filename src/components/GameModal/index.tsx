import gameParams from '@/gameParams';
import { IGameModal } from './interfaces';
import './index.css';

const {
  BOARD_HEIGHT,
  BOARD_WIDTH,
} = gameParams;

const GameModal = ({
  buttonLabel,
  children,
  onClick,
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
      <button
        className="game-modal__button"
        onClick={onClick}
        type="button"
      >
        {buttonLabel}
      </button>
    </div>
  </div>
);

export default GameModal;

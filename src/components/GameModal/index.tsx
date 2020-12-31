import gameParams from '@/gameParams';
import { IGameModal } from './interfaces';
import './index.css';

const {
  boardHeight,
  boardWidth,
} = gameParams;

const GameModal = ({
  buttonLabel,
  children,
  onClick,
  title,
}: IGameModal) => (
  <div
    className="game-modal-wrapper"
    style={{ width: boardWidth + 2, height: boardHeight + 2 }}
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

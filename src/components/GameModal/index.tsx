import gameConfig from '@/game/config';
import type { IGameModal } from './interfaces';
import css from './index.css';

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
    className={css.gameModalWrapper}
    style={{ width: BOARD_WIDTH + 2, height: BOARD_HEIGHT + 2 }}
  >
    <div className={css.gameModal}>
      <h2 className={css.gameModalTitle}>{title}</h2>
      {children && (
        <div className={css.gameModalContent}>
          {children}
        </div>
      )}
      <div className={css.gameModalButtonGroup}>
        {buttons.map(({ label, onClick }, index) => (
          <button
            key={label}
            className={css.gameModalButtonGroupItem}
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

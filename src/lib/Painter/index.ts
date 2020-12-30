import gameParams from '@/gameParams';
import {
  Direction,
  ICanvasSnakePart,
  IFood,
  ISnakePart,
} from './interfaces';

const { boardItemSize } = gameParams;

export default abstract class Painter {
  private static ctx: CanvasRenderingContext2D | null;

  public static setContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  private static renderTail({
    x,
    y,
    direction,
    changeDirection,
  }: ICanvasSnakePart) {
    if (Painter.ctx === null) {
      return;
    }
    switch (direction) {
      case Direction.RIGHT: {
        Painter.ctx.fillRect(
          x * boardItemSize + 4,
          y * boardItemSize + 4,
          changeDirection ? 8 : 12,
          4,
        );
        Painter.ctx.fillRect(
          x * boardItemSize - 4,
          y * boardItemSize + 8,
          changeDirection ? 12 : 16,
          4,
        );
        break;
      }
      case Direction.LEFT: {
        Painter.ctx.fillRect(
          changeDirection ? x * boardItemSize + 4 : x * boardItemSize,
          y * boardItemSize + 4,
          changeDirection ? 8 : 12,
          4,
        );
        Painter.ctx.fillRect(
          changeDirection ? x * boardItemSize + 8 : x * boardItemSize + 4,
          y * boardItemSize + 8,
          changeDirection ? 12 : 16,
          4,
        );
        break;
      }
      case Direction.BOTTOM: {
        Painter.ctx.fillRect(
          x * boardItemSize + 4,
          y * boardItemSize - 4,
          4,
          changeDirection ? 12 : 16,
        );
        Painter.ctx.fillRect(
          x * boardItemSize + 8,
          y * boardItemSize + 4,
          4,
          changeDirection ? 8 : 12,
        );
        break;
      }
      case Direction.TOP: {
        Painter.ctx.fillRect(
          x * boardItemSize + 4,
          changeDirection ? y * boardItemSize + 8 : y * boardItemSize + 4,
          4,
          changeDirection ? 12 : 16,
        );
        Painter.ctx.fillRect(
          x * boardItemSize + 8,
          changeDirection ? y * boardItemSize + 4 : y * boardItemSize,
          4,
          changeDirection ? 8 : 12,
        );
        break;
      }
      default:
        break;
    }
  }

  private static renderBody({
    x,
    y,
    direction,
    changeDirection,
  }: ICanvasSnakePart) {
    if (Painter.ctx === null) {
      return;
    }
    switch (direction) {
      case Direction.RIGHT: {
        Painter.ctx.fillRect(
          x * boardItemSize + 4,
          y * boardItemSize + 4,
          changeDirection ? 8 : 12,
          4,
        );
        Painter.ctx.fillRect(
          x * boardItemSize,
          y * boardItemSize + 8,
          changeDirection ? 8 : 12,
          4,
        );
        break;
      }
      case Direction.LEFT: {
        Painter.ctx.fillRect(
          changeDirection ? x * boardItemSize + 4 : x * boardItemSize,
          y * boardItemSize + 4,
          changeDirection ? 8 : 12,
          4,
        );
        Painter.ctx.fillRect(
          changeDirection ? x * boardItemSize + 8 : x * boardItemSize + 4,
          y * boardItemSize + 8,
          changeDirection ? 8 : 12,
          4,
        );
        break;
      }
      case Direction.BOTTOM: {
        Painter.ctx.fillRect(
          x * boardItemSize + 4,
          y * boardItemSize,
          4,
          changeDirection ? 8 : 12,
        );
        Painter.ctx.fillRect(
          x * boardItemSize + 8,
          y * boardItemSize + 4,
          4,
          changeDirection ? 8 : 12,
        );
        break;
      }
      case Direction.TOP: {
        Painter.ctx.fillRect(
          x * boardItemSize + 4,
          changeDirection ? y * boardItemSize + 8 : y * boardItemSize + 4,
          4,
          changeDirection ? 8 : 12,
        );
        Painter.ctx.fillRect(
          x * boardItemSize + 8,
          changeDirection ? y * boardItemSize + 4 : y * boardItemSize,
          4,
          changeDirection ? 8 : 12,
        );
        break;
      }
      default:
        break;
    }
  }

  private static renderBodyAfterEat({
    x,
    y,
    direction,
    changeDirection,
  }: ICanvasSnakePart) {
    if (Painter.ctx === null) {
      return;
    }
    switch (direction) {
      case Direction.RIGHT: {
        Painter.ctx.fillRect(
          x * boardItemSize + 4,
          y * boardItemSize,
          8,
          4,
        );
        Painter.ctx.fillRect(
          x * boardItemSize + 4,
          y * boardItemSize + 4,
          12,
          4,
        );
        Painter.ctx.fillRect(
          x * boardItemSize,
          y * boardItemSize + 8,
          changeDirection ? 16 : 12,
          4,
        );
        Painter.ctx.fillRect(
          x * boardItemSize + 4,
          y * boardItemSize + 12,
          8,
          4,
        );
        break;
      }
      case Direction.LEFT: {
        Painter.ctx.fillRect(
          x * boardItemSize + 4,
          y * boardItemSize,
          8,
          4,
        );
        Painter.ctx.fillRect(
          x * boardItemSize,
          y * boardItemSize + 4,
          12,
          4,
        );
        Painter.ctx.fillRect(
          changeDirection ? x * boardItemSize : x * boardItemSize + 4,
          y * boardItemSize + 8,
          changeDirection ? 16 : 12,
          4,
        );
        Painter.ctx.fillRect(
          x * boardItemSize + 4,
          y * boardItemSize + 12,
          8,
          4,
        );
        break;
      }
      case Direction.BOTTOM: {
        Painter.ctx.fillRect(
          x * boardItemSize,
          y * boardItemSize + 4,
          4,
          8,
        );
        Painter.ctx.fillRect(
          x * boardItemSize + 4,
          y * boardItemSize,
          4,
          changeDirection ? 16 : 12,
        );
        Painter.ctx.fillRect(
          x * boardItemSize + 8,
          y * boardItemSize + 4,
          4,
          12,
        );
        Painter.ctx.fillRect(
          x * boardItemSize + 12,
          y * boardItemSize + 4,
          4,
          8,
        );
        break;
      }
      case Direction.TOP: {
        Painter.ctx.fillRect(
          x * boardItemSize,
          y * boardItemSize + 4,
          4,
          8,
        );
        Painter.ctx.fillRect(
          x * boardItemSize + 4,
          changeDirection ? y * boardItemSize : y * boardItemSize + 4,
          4,
          changeDirection ? 16 : 12,
        );
        Painter.ctx.fillRect(
          x * boardItemSize + 8,
          y * boardItemSize,
          4,
          12,
        );
        Painter.ctx.fillRect(
          x * boardItemSize + 12,
          y * boardItemSize + 4,
          4,
          8,
        );
        break;
      }
      default:
        break;
    }
  }

  private static renderHead({
    x,
    y,
    direction,
  }: ICanvasSnakePart) {
    if (Painter.ctx === null) {
      return;
    }
    switch (direction) {
      case Direction.RIGHT: {
        Painter.ctx.fillRect(x * boardItemSize + 8, y * boardItemSize, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 12, y * boardItemSize + 4, 8, 4);
        Painter.ctx.fillRect(x * boardItemSize + 4, y * boardItemSize + 4, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize, y * boardItemSize + 8, 20, 4);
        break;
      }
      case Direction.LEFT: {
        Painter.ctx.fillRect(x * boardItemSize + 4, y * boardItemSize, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 8, y * boardItemSize + 4, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize - 4, y * boardItemSize + 4, 8, 4);
        Painter.ctx.fillRect(x * boardItemSize - 4, y * boardItemSize + 8, 20, 4);
        break;
      }
      case Direction.BOTTOM: {
        Painter.ctx.fillRect(x * boardItemSize + 4, y * boardItemSize, 4, 20);
        Painter.ctx.fillRect(x * boardItemSize + 8, y * boardItemSize + 4, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 8, y * boardItemSize + 12, 4, 8);
        Painter.ctx.fillRect(x * boardItemSize + 12, y * boardItemSize + 8, 4, 4);
        break;
      }
      case Direction.TOP: {
        Painter.ctx.fillRect(x * boardItemSize + 4, y * boardItemSize - 4, 4, 20);
        Painter.ctx.fillRect(x * boardItemSize + 8, y * boardItemSize - 4, 4, 8);
        Painter.ctx.fillRect(x * boardItemSize + 8, y * boardItemSize + 8, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 12, y * boardItemSize + 4, 4, 4);
        break;
      }
      default:
        break;
    }
  }

  private static renderHeadReadyToEat({
    x,
    y,
    direction,
  }: ICanvasSnakePart) {
    if (Painter.ctx === null) {
      return;
    }
    switch (direction) {
      case Direction.RIGHT: {
        Painter.ctx.fillRect(x * boardItemSize + 8, y * boardItemSize, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 16, y * boardItemSize, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 12, y * boardItemSize + 4, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 4, y * boardItemSize + 4, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize, y * boardItemSize + 8, 16, 4);
        Painter.ctx.fillRect(x * boardItemSize + 16, y * boardItemSize + 12, 4, 4);
        break;
      }
      case Direction.LEFT: {
        Painter.ctx.fillRect(x * boardItemSize - 4, y * boardItemSize, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 4, y * boardItemSize, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 8, y * boardItemSize + 4, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize, y * boardItemSize + 4, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize, y * boardItemSize + 8, 16, 4);
        Painter.ctx.fillRect(x * boardItemSize - 4, y * boardItemSize + 12, 4, 4);
        break;
      }
      case Direction.BOTTOM: {
        Painter.ctx.fillRect(x * boardItemSize, y * boardItemSize + 16, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 4, y * boardItemSize, 4, 16);
        Painter.ctx.fillRect(x * boardItemSize + 8, y * boardItemSize + 4, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 8, y * boardItemSize + 12, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 12, y * boardItemSize + 8, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 12, y * boardItemSize + 16, 4, 4);
        break;
      }
      case Direction.TOP: {
        Painter.ctx.fillRect(x * boardItemSize, y * boardItemSize - 4, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 4, y * boardItemSize, 4, 16);
        Painter.ctx.fillRect(x * boardItemSize + 8, y * boardItemSize, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 8, y * boardItemSize + 8, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 12, y * boardItemSize - 4, 4, 4);
        Painter.ctx.fillRect(x * boardItemSize + 12, y * boardItemSize + 4, 4, 4);
        break;
      }
      default:
        break;
    }
  }

  public static renderSnake(coords: ISnakePart[]) {
    if (Painter.ctx === null) {
      return;
    }
    coords.forEach(({
      x,
      y,
      direction,
      eaten,
      readyToEat,
    }, i) => {
      const changeDirection = direction !== coords[i + 1]?.direction;
      if (i === coords.length - 1) {
        if (readyToEat) {
          Painter.renderHeadReadyToEat({
            x,
            y,
            direction,
          });
        } else {
          Painter.renderHead({
            x,
            y,
            direction,
          });
        }
      } else if (i === 0) {
        Painter.renderTail({
          x,
          y,
          direction,
          changeDirection,
        });
      } else if (eaten) {
        Painter.renderBodyAfterEat({
          x,
          y,
          direction,
          changeDirection,
        });
      } else {
        Painter.renderBody({
          x,
          y,
          direction,
          changeDirection,
        });
      }
    });
  }

  public static renderFood({
    x,
    y,
  }: IFood) {
    if (Painter.ctx === null) {
      return;
    }
    Painter.ctx.fillRect(x * boardItemSize + 6, y * boardItemSize + 2, 4, 4);
    Painter.ctx.fillRect(x * boardItemSize + 2, y * boardItemSize + 6, 4, 4);
    Painter.ctx.fillRect(x * boardItemSize + 10, y * boardItemSize + 6, 4, 4);
    Painter.ctx.fillRect(x * boardItemSize + 6, y * boardItemSize + 10, 4, 4);
  }

  public static renderBigFood({
    x,
    y,
  }: IFood) {
    if (Painter.ctx === null) {
      return;
    }
    Painter.ctx.fillRect(x * boardItemSize + 5.5, y * boardItemSize + 0.5, 5, 5);
    Painter.ctx.fillRect(x * boardItemSize + 0.5, y * boardItemSize + 5.5, 15, 5);
    Painter.ctx.fillRect(x * boardItemSize + 5.5, y * boardItemSize + 10.5, 5, 5);
  }
}

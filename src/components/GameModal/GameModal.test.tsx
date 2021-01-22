import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import GameModal from './index';

describe('GameModal', () => {
  const onClick = jest.fn();
  const buttons = [{
    label: 'Button',
    onClick,
  }];

  beforeEach(() => {
    onClick.mockReset();
  });

  it('checking title', () => {
    render(
      <GameModal
        buttons={buttons}
        title="Title"
      />,
    );

    expect(screen.getByText('Title')).not.toBeNull();
  });

  it('checking button', () => {
    render(
      <GameModal
        buttons={buttons}
        title="Title"
      />,
    );

    fireEvent.click(screen.getByText('Button'));

    expect(onClick).toBeCalledTimes(1);
  });

  it('checking content', () => {
    render(
      <GameModal
        buttons={buttons}
        title="Title"
      >
        <div>Modal content</div>
      </GameModal>,
    );

    expect(screen.getByText('Modal content')).not.toBeNull();
  });
});

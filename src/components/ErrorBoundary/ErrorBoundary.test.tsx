import { render } from '@testing-library/react';
import ErrorBoundary from '.';

describe('ErrorBoundary', () => {
  const { errorText } = ErrorBoundary.defaultProps;
  const normalText = 'Normal';
  const NormalComponent = () => <div>{normalText}</div>;
  const ErrorComponent = () => {
    throw new Error('Test error');
    return <div>{normalText}</div>;
  };

  it('renders children without error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>,
    );

    expect(getByText(normalText)).toBeTruthy();
  });

  it('renders children with error', () => {
    const spyError = jest.spyOn(console, 'error').mockImplementation(() => null);
    const spyLog = jest.spyOn(console, 'log').mockImplementation(() => null);

    const { getByText } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    spyError.mockRestore();
    spyLog.mockRestore();

    expect(getByText(errorText)).toBeTruthy();
  });
});

import { render, fireEvent } from '@testing-library/react';
import Textarea from '.';

describe('Textarea', () => {
  const label = 'Label';
  const error = 'Error';
  const value = 'initial';

  it('renders dom right', () => {
    const { getByText, getByDisplayValue } = render(
      <Textarea name="name" label={label} error={error} value={value} onChange={() => false} onBlur={() => false} />,
    );

    expect(getByText(label)).toBeTruthy();
    expect(getByText(error)).toBeTruthy();
    expect(getByDisplayValue(value)).toBeTruthy();
  });

  it('calls event listeners', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const { getByDisplayValue } = render(
      <Textarea name="name" label={label} error={error} value={value} onChange={onChange} onBlur={onBlur} />,
    );

    const input = getByDisplayValue(value);
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(onChange).toBeCalled();
    fireEvent.blur(input, {});
    expect(onBlur).toBeCalled();
  });
});

import {
  useCallback,
  useState,
} from 'react';

const useToggle = (defaultValue: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(defaultValue);

  const toggleState = useCallback(() => {
    setState((s) => !s);
  }, []);

  return [state, toggleState];
};

export default useToggle;

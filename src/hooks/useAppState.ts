import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

const useAppState = () => {
  const [isComeback, setIsComback] = useState(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscripttion = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsComback(true);
      }

      if (appState.current.match(/active/) && nextAppState === 'background') {
        setIsComback(false);
      }

      appState.current = nextAppState;

      return () => {
        subscripttion.remove();
      };
    });
  }, []);

  return { isComeback };
};

export default useAppState;

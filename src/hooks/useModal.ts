import { useState } from 'react';

const useModal = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const hide = () => setIsVisible(false);
  const show = () => setIsVisible(true);

  return { hide, show, isVisible };
};

export default useModal;

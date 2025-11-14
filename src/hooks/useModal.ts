import { useState } from 'react';

const useModal = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const hide = () => setIsVisible(false);
  const visible = () => setIsVisible(true);

  return { hide, visible, isVisible };
};

export default useModal;

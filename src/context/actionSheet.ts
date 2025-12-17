import { GestureResponderEvent } from 'react-native';
import { createContext } from 'react';

interface ActionSheetContextValue {
  onPressOutSide?: (event: GestureResponderEvent) => void;
}

const ActionSheetContext = createContext<ActionSheetContextValue | undefined>(
  undefined,
);

export default ActionSheetContext;

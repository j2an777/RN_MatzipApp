import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { PropsWithChildren, useContext } from 'react';

import ActionSheetContext from '@/context/actionSheet';
import { colors } from '@/constants/colors';

interface ActionProps {
  children: React.ReactNode;
  isVisible: boolean;
  hideAction: () => void;
  animationType?: ModalProps['animationType'];
}

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  isDanger?: boolean;
  isChecked?: boolean;
}

const ActionMain = ({
  children,
  isVisible,
  animationType = 'slide',
  hideAction,
  ...props
}: ActionProps) => {
  const onPressOutSide = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) hideAction();
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType={animationType}
      onRequestClose={hideAction}
      statusBarTranslucent
      {...props}>
      <ActionSheetContext value={{ onPressOutSide }}>
        {children}
      </ActionSheetContext>
    </Modal>
  );
};

const Background = ({ children }: PropsWithChildren) => {
  const actionSheetContext = useContext(ActionSheetContext);

  return (
    <SafeAreaView
      style={styles.actionBackground}
      onTouchEnd={actionSheetContext?.onPressOutSide}>
      {children}
    </SafeAreaView>
  );
};

const Container = ({ children }: PropsWithChildren) => (
  <View style={styles.actionContainer}>{children}</View>
);

const Button = ({
  children,
  isDanger = false,
  isChecked = false,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed && styles.actionButtonPressed,
        styles.actionButton,
      ]}
      {...props}>
      <Text style={[styles.actionText, isDanger && styles.dangerText]}>
        {children}
      </Text>
      {isChecked && (
        <Ionicons name="checkmark" size={20} color={colors.BLUE_500} />
      )}
    </Pressable>
  );
};

const Title = ({ children }: PropsWithChildren) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
};

const Divider = () => <View style={styles.border} />;

interface FilterProps extends PressableProps {
  children: React.ReactNode;
  isSelected?: boolean;
}

const Filter = ({ children, isSelected, ...props }: FilterProps) => {
  return (
    <Pressable style={styles.filterContainer} {...props}>
      <Text style={isSelected ? styles.filterSelectedText : styles.filterText}>
        {children}
      </Text>
      <Ionicons
        name="chevron-down"
        size={22}
        color={isSelected ? colors.BLUE_500 : colors.GRAY_300}
      />
    </Pressable>
  );
};

interface CheckBoxProps extends PressableProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  isChecked?: boolean;
}

const CheckBox = ({
  children,
  icon = null,
  isChecked = false,
  ...props
}: CheckBoxProps) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.checkBoxContainer,
        pressed && styles.actionButtonPressed,
      ]}>
      <Ionicons
        name={isChecked ? 'checkmark-circle' : 'checkmark-circle-outline'}
        size={22}
        color={colors.BLUE_500}
      />
      {icon}
      <Text style={styles.checkBoxText}>{children}</Text>
    </Pressable>
  );
};

const ActionSheet = Object.assign(ActionMain, {
  Container,
  Button,
  Title,
  Divider,
  Background,
  Filter,
  CheckBox,
});

const styles = StyleSheet.create({
  actionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  actionContainer: {
    backgroundColor: colors.GRAY_100,
    overflow: 'hidden',
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    gap: 5,
  },
  actionButtonPressed: {
    backgroundColor: colors.GRAY_200,
  },
  actionText: {
    fontSize: 17,
    color: colors.BLUE_500,
    fontWeight: '500',
  },
  dangerText: {
    color: colors.RED_500,
  },
  titleContainer: {
    padding: 15,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },
  border: {
    borderBottomColor: colors.GRAY_200,
    borderBottomWidth: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 5,
  },
  filterText: {
    color: colors.GRAY_300,
    fontSize: 15,
    fontWeight: '500',
  },
  filterSelectedText: {
    color: colors.BLUE_500,
    fontSize: 15,
    fontWeight: '500',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    gap: 10,
  },
  checkBoxText: {
    color: colors.BLACK,
    fontSize: 15,
  },
});

export default ActionSheet;

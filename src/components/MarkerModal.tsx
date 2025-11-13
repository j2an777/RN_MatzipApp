import { Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';

import useGetPost from '@/hooks/queries/useGetPosts';
import { colors } from '@/constants/colors';

interface Props {
  markerId: number;
  isVisible: boolean;
  hide: () => void;
}

const MarkerModal = ({ markerId, isVisible, hide }: Props) => {
  const { data: post } = useGetPost(markerId);

  return (
    <Modal visible={isVisible} transparent>
      <SafeAreaView style={styles.background}>
        <Pressable style={styles.cardContainer}>
          <View style={styles.cardInner}></View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.GRAY_500,
  },
  cardInner: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MarkerModal;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useAuth } from '../../../../providers/auth';

export const HomeHeader = ({
  toggleBottomSheet,
}: {
  toggleBottomSheet(): void;
}) => {
  const { logout } = useAuth();

  return (
    <View style={styles.headerWrapper}>
      <IconButton icon="menu" size={35} onPress={toggleBottomSheet} />
      <IconButton icon="logout-variant" size={35} onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { AppNavigator } from './modules/auth/app-navigator';
import { AuthProvider } from './providers/auth';
import { PaperProvider } from 'react-native-paper';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from 'react-query';

import React from 'react';
import { queryClient } from './api/basic';

export default function App() {
  return (
    <View style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <BottomSheetModalProvider>
          <PaperProvider>
            <AuthProvider>
              <StatusBar style="auto" />
              <AppNavigator />
            </AuthProvider>
          </PaperProvider>
        </BottomSheetModalProvider>
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

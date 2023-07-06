import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { SignIn } from './sign-in';
import { useAuth } from '../../providers/auth';
import { Home } from '../home';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      {/*<Stack.Navigator screenOptions={{ headerShown: false }}>*/}
      {/*  <Stack.Screen name="sign-in" component={SignIn} />*/}
      {/*</Stack.Navigator>*/}
      {isLoggedIn ? <Home /> : <SignIn />}
    </NavigationContainer>
  );
};

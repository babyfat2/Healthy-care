import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/auth/Login';
import Register from '../screen/auth/Register';
import { AuthRootStackParamList } from '../type/navigation';

const Stack = createNativeStackNavigator<AuthRootStackParamList>();

export default function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}

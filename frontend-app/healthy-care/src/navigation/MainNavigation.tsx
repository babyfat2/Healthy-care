import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screen/Home';
import Hospital from '../screen/hospital/Hospital';
import Setting from '../screen/Setting/Setting';
import useStyles from '../style/useStyles';
import { useColorScheme } from 'react-native';
import useThemeColor from '../style/useThemeColor';

const Tab = createBottomTabNavigator();


const getIconName = (routeName: string, focused: boolean) => {
  switch (routeName) {
    case 'Home':
      return focused ? 'home' : 'home-outline';
    case 'Hospital':
      return focused ? 'medkit' : 'medkit-outline';
    case 'Settings':
      return focused ? 'settings' : 'settings-outline';
    default:
      return 'ellipse-outline';
  }
};

export default function MainNavigation() {
  const color = useThemeColor();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={getIconName(route.name, focused)} size={size} color={color} />
        ),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: color.tabNavigation,
          borderTopWidth: 0,
          height: 60,
        },

        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Hospital" component={Hospital} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
}

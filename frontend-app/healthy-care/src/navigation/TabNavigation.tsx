import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Hospital from '../screen/hospital/Hospital';
import Setting from '../screen/Setting/Setting';
import useThemeColor from '../style/useThemeColor';
import { RootTabParamList } from '../type/navigation';
import MedicineListScreen from '../screen/MedicineList/MedicineList';
import MedicineSchedule from '../screen/medicineSchedule/MedicineSchedule';
import MedicalHistory from '../screen/MedicalHistory/MedicalHistory';

const Tab = createBottomTabNavigator<RootTabParamList>();


const getIconName = (routeName: string, focused: boolean) => {
  switch (routeName) {
    case 'MedicalHistory':
      return focused ? 'list' : 'list-outline';
    case 'Hospital':
      return focused ? 'business' : 'business-outline';
    case 'Setting':
      return focused ? 'settings' : 'settings-outline';
    case 'Medicine':
      return focused ? 'medkit' : 'medkit-outline';
      case 'MedicineSchedule':
      return focused ? 'time' : 'time-outline';
    default:
      return 'ellipse-outline';
  }
};

export default function TabNavigation() {
  const color = useThemeColor();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={getIconName(route.name, focused)} size={size} color={color} />
        ),
        tabBarActiveTintColor: '#007AFF',
        tabBarStyle: {
          backgroundColor: color.tabNavigation,
          borderTopWidth: 0,
          height: 60,
        },

        headerShown: false,
      })}
    >
      <Tab.Screen
        name="MedicineSchedule"
        component={MedicineSchedule}
        options={{ tabBarLabel: 'Lịch biểu' }}
      />
      <Tab.Screen name="Hospital" component={Hospital} options={{ tabBarLabel: 'Bệnh viện' }} />
      <Tab.Screen name="Medicine" component={MedicineListScreen} options={{ tabBarLabel: 'Thuốc' }} />
      <Tab.Screen name="MedicalHistory" component={MedicalHistory} options={{ tabBarLabel: 'Lịch sử khám' }} />
      <Tab.Screen name="Setting" component={Setting} options={{ tabBarLabel: 'Cài đặt' }} />
    </Tab.Navigator>
  );
}

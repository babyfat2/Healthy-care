import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainRootStackParamList } from '../type/navigation';
import Home from '../screen/Home';
import Hospital from '../screen/hospital/Hospital';
import HospitalDetail from '../screen/hospital/HospitalDetail';
import Setting from '../screen/Setting/Setting';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator<MainRootStackParamList>();

export default function MainNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Hospital" component={Hospital} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="HospitalDetail" component={HospitalDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

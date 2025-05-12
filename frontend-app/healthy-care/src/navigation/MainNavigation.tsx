import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainRootStackParamList } from '../type/navigation';
import Hospital from '../screen/hospital/Hospital';
import HospitalDetail from '../screen/hospital/HospitalDetail';
import Setting from '../screen/Setting/Setting';
import TabNavigation from './TabNavigation';
import MedicalHistory from '../screen/MedicalHistory/MedicalHistory';
import MedicalHistoryDetail from '../screen/MedicalHistory/MedicalHistoryDetail';

const Stack = createNativeStackNavigator<MainRootStackParamList>();

export default function MainNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Hospital" component={Hospital} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="HospitalDetail" component={HospitalDetail} options={{ headerShown: false }} />
            <Stack.Screen name="MedicalHistory" component={MedicalHistory} options={{ headerShown: false }} />
            <Stack.Screen name="MedicalHistoryDetail" component={MedicalHistoryDetail}  options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

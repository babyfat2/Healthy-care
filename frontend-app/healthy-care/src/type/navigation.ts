import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthRootStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type LoginNavigationProp = NativeStackNavigationProp<AuthRootStackParamList, 'Login'>;

export type RootTabParamList = {
    Hospital: undefined;
    Setting: undefined;
    Medicine: undefined;
    MedicineSchedule: undefined;
    MedicalHistory: undefined;
  };

export type MainRootStackParamList = {
    TabNavigation: undefined,
    Hospital: undefined,
    Setting: undefined,
    HospitalDetail: {
        hospital_id: number,
    },
    MedicalHistoryDetail: {
        appointment_id: string,
    },
    MedicalHistory: undefined,
}

export type HospitalNavigationProp = NativeStackScreenProps<MainRootStackParamList, 'Hospital'>;

export type HospitalDetailNavigationProp = NativeStackScreenProps<MainRootStackParamList, 'HospitalDetail'>;

export type MedicalHistoryNavigationProp = NativeStackScreenProps<MainRootStackParamList, 'MedicalHistory'>;

export type MedicalHistoryDetailNavigationProp = NativeStackScreenProps<MainRootStackParamList, 'MedicalHistoryDetail'>;
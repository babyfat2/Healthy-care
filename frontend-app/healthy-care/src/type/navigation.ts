import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthRootStackParamList = {
    Login: undefined;
    Register: undefined;
};

export type LoginNavigationProp = NativeStackNavigationProp<AuthRootStackParamList, 'Login'>;

export type MainRootStackParamList = {
    TabNavigation: undefined,
    Home: undefined,
    Hospital: undefined,
    Setting: undefined,
    HospitalDetail: {
        hospital_id: number,
    },
}

export type HospitalNavigationProp = NativeStackScreenProps<MainRootStackParamList, 'Hospital'>;

export type HospitalDetailNavigationProp = NativeStackScreenProps<MainRootStackParamList, 'HospitalDetail'>;
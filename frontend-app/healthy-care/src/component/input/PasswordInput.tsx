import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import useStyles from '../../style/useStyles';
import { ISize } from '../../style/size';
import { IColor } from '../../style/color';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export function PasswordInput({
    password,
    onChangePassword,
} : {
    password: string,
    onChangePassword: (value: string) => void,
}) {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const { styles } = useStyles(createStyles);
    return (
        <View style={styles.passwordContainer}>
            <TextInput
                placeholder="Mật khẩu"
                placeholderTextColor="#888"
                secureTextEntry={!passwordVisible}
                style={styles.passwordInput}
                value={password}
                onChangeText={onChangePassword}
            />
            <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.eyeIcon}
            >
                <Ionicons
                    name={passwordVisible ? 'eye' : 'eye-off'}
                    size={24}
                    color="#888"
                />
            </TouchableOpacity>
        </View>
    );
}


const createStyles = (size: ISize, color: IColor) =>
    StyleSheet.create({
        passwordContainer: {
            position: 'relative',
            justifyContent: 'center',
        },
        passwordInput: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontSize: size.bodyMedium,
            paddingRight: 48, // chừa chỗ cho icon
            marginBottom: 16,
        },
        eyeIcon: {
            position: 'absolute',
            right: 16,
            top: 12,
        },
    });

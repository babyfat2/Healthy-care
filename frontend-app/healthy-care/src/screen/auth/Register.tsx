import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import useStyles from '../../style/useStyles';
import { ISize } from '../../style/size';
import { IColor } from '../../style/color';
import { PasswordInput } from '../../component/input/PasswordInput';
import { useNavigation } from '@react-navigation/native';
import { useRegisterMutation } from '../../redux/api/auth';

function Register() {
    const { styles } = useStyles(createStyles);
    const navigation = useNavigation();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const [register] = useRegisterMutation();

    const registerButton = () => {
        setUserNameError('');
        setPasswordError('');
        setFullNameError('');
        setGeneralError('');

        let isValid = true;

        if (!userName) {
            setUserNameError('Vui lòng nhập tên đăng nhập.');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Vui lòng nhập mật khẩu.');
            isValid = false;
        }

        if (!fullName) {
            setFullNameError('Vui lòng nhập họ và tên.');
            isValid = false;
        }

        if (!isValid) return;

        // Gọi API đăng ký ở đây với userName, password, fullName
        register({username: userName, password: password, full_name: fullName, role: "Bệnh nhân"})
        .unwrap()
        .then((e) => {
          alert("Đăng ký tài khoản thành công")
          navigation.goBack()
        })
        .catch((e) =>  {
          setGeneralError(e.data.message);
        })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tạo tài khoản mới</Text>
            <Text style={styles.subtitle}>Chào mừng bạn đến với Healthy Care</Text>

            <TextInput
                placeholder="Tên đăng nhập"
                placeholderTextColor="#888"
                style={styles.input}
                autoCapitalize="none"
                value={userName}
                onChangeText={text => {
                    setUserName(text);
                    if (userNameError && text) {
                        setUserNameError('');
                    }
                }}
            />
            {userNameError ? <Text style={styles.errorText}>{userNameError}</Text> : null}

            <PasswordInput password={password} onChangePassword={setPassword} />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TextInput
                placeholder="Họ và tên"
                placeholderTextColor="#888"
                style={styles.input}
                value={fullName}
                onChangeText={text => {
                    setFullName(text);
                    if (fullNameError && text) {
                        setFullNameError('');
                    }
                }}
            />
            {fullNameError ? <Text style={styles.errorText}>{fullNameError}</Text> : null}

            {generalError ? <Text style={styles.errorText}>{generalError}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={registerButton}>
                <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Đã có tài khoản?{' '}
                <Text style={styles.registerText} onPress={() => navigation.goBack()}>
                    Đăng nhập
                </Text>
            </Text>
        </View>
    );
}

export default Register;

const createStyles = (size: ISize, color: IColor) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.backgroundColor,
            justifyContent: 'center',
            padding: 24,
        },
        title: {
            fontSize: size.h1,
            fontWeight: 'bold',
            color: color.textHeader,
            textAlign: 'center',
            marginBottom: 8,
        },
        subtitle: {
            fontSize: size.bodyMedium,
            color: color.text,
            textAlign: 'center',
            marginBottom: 32,
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontSize: size.bodyMedium,
            marginBottom: 8,
        },
        button: {
            backgroundColor: color.button,
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: 'center',
            marginTop: 20, // Tăng khoảng cách với input cuối
            marginBottom: 20,
        },
        buttonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
        },
        errorText: {
            color: 'red',
            fontSize: 14,
            marginBottom: 8,
            marginLeft: 4,
        },
        footerText: {
            textAlign: 'center',
            color: '#666',
            fontSize: 14,
        },
        registerText: {
            color: color.textSecond,
            fontWeight: 'bold',
        },
    });
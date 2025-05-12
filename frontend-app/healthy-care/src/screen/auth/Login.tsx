import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import useStyles from '../../style/useStyles';
import { ISize } from '../../style/size';
import { IColor } from '../../style/color';
import { PasswordInput } from '../../component/input/PasswordInput';
import { useLoginMutation } from '../../redux/api/auth';
import {  useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginNavigationProp } from '../../type/navigation';

function Login() {
    const { styles } = useStyles(createStyles);
    const [login] = useLoginMutation();
    const navigation = useNavigation<LoginNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [generalError, setGeneralError] = useState('');

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const loginButton = () => {
        setEmailError('');
        setGeneralError('');

        let isValid = true;

        if (!email) {
            setEmailError('Vui lòng nhập email.');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Email không hợp lệ.');
            isValid = false;
        }

        if (!password) {
            setGeneralError('Vui lòng nhập mật khẩu.');
            isValid = false;
        }

        if (!isValid) return;

        login({ username: email, password })
            .unwrap()
            .then(res => {
                
            })
            .catch(err => {
                setGeneralError('Email hoặc mật khẩu không chính xác.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Healthy Care</Text>
            <Text style={styles.subtitle}>Chào mừng bạn đến với ứng dụng chăm sóc sức khỏe</Text>

            <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={text => {
                    setEmail(text);
                    if (emailError) {
                        if (validateEmail(text)) {
                            setEmailError('');
                        }
                    }
                }}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <PasswordInput password={password} onChangePassword={setPassword} />

            {generalError ? <Text style={styles.errorText}>{generalError}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={loginButton}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Chưa có tài khoản? <Text style={styles.registerText} onPress={() => navigation.navigate('Register')}>Đăng ký</Text>
            </Text>
        </View>
    );
}

export default Login;

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
            marginTop: 12,
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

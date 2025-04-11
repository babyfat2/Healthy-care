import React from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import useStyles from '../../style/useStyles';
import { ISize } from '../../style/size';
import { IColor } from '../../style/color';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { changeDarkMode, changeFontSize } from '../../redux/slice/theme';
import { logout } from '../../redux/slice/user';

export default function Setting() {
    const darkMode = useAppSelector((state) => state.theme.darkmode);
    const fontSize = useAppSelector((state) => state.theme.fontSize) + 16;
    const { styles } = useStyles(createStyles);
    const dispatch = useAppDispatch();

    const handleFontSizeChange = (value: number) => dispatch(changeFontSize({ fontSize: value - 16 }));

    const userInfo = {
        name: 'Nguyễn Văn A',
        email: 'vana@example.com',
        avatar: 'https://i.pravatar.cc/100?img=1',
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <View style={styles.container}>
            <View>
                {/* Thông tin người dùng */}
                <View style={styles.userCard}>
                    <View style={styles.profile}>
                        <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
                        <View>
                            <Text style={styles.label}>{userInfo.name}</Text>
                            <Text style={styles.label}>{userInfo.email}</Text>
                        </View>
                    </View>
                </View>

                {/* Các tùy chọn */}
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.label}>🧑 Thay đổi thông tin cá nhân</Text>
                </TouchableOpacity>

                <View style={styles.option}>
                    <Text style={styles.label}>🌙 Chế độ tối</Text>
                    <Switch
                        value={darkMode}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={() => { dispatch(changeDarkMode()) }}
                    />
                </View>

                <View style={styles.option}>
                    <Text style={styles.label}>🔤 Cỡ chữ: {Math.round(fontSize)}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={12}
                        maximumValue={20}
                        step={1}
                        value={fontSize}
                        onValueChange={handleFontSizeChange}
                        minimumTrackTintColor="#007AFF"
                        maximumTrackTintColor="#000000"
                    />
                </View>
            </View>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn} >
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

const createStyles = (size: ISize, color: IColor) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            justifyContent: 'space-between',
            backgroundColor: color.backgroundColor,
        },
        userCard: {
            backgroundColor: color.card,
            padding: 16,
            borderRadius: 16,
            marginTop: 30,
            marginBottom: 30,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
        },
        profile: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
        },
        avatar: {
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 15,
        },
        option: {
            marginBottom: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        label: {
            color: color.text,
            fontSize: size.bodyMedium
        },
        slider: {
            width: 200,
            height: 40,
        },
        logoutBtn: {
            alignItems: 'center',
            paddingVertical: 12,
            borderRadius: 8,
            backgroundColor: '#FF3B30',
        },
        logoutText: {
            color: '#fff',
            fontSize: size.bodyLarge,
            fontWeight: 'bold',
        },
    });

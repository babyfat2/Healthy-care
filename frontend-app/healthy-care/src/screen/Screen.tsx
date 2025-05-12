import React from 'react';
import { StatusBar, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AuthNavigation from '../navigation/AuthNavigation';
import MainNavigation from '../navigation/MainNavigation';
import { useAppSelector } from '../redux/hook';
import FirstScreen from './FirstScreen';
import useStyles from '../style/useStyles';
import { ISize } from '../style/size';
import { IColor } from '../style/color';

function Screen() {
    const is_first = useAppSelector((state) => state.route.is_first);
    const is_login = useAppSelector((state) => state.user.isLogin);
    const { styles } = useStyles(createStyles);

    return (
        <SafeAreaProvider>
            {/* Cập nhật StatusBar để không đẩy quá sâu */}
            <StatusBar barStyle="dark-content" backgroundColor="#f7fafd" translucent />
            
            <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
                {is_first ? (
                    <FirstScreen />
                ) : is_login ? (
                    <MainNavigation />
                ) : (
                    <AuthNavigation />
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const createStyles = (size: ISize, color: IColor) =>
  StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: color.backgroundColor,
        // Đảm bảo không đẩy quá sâu
        paddingTop: Platform.OS === 'android' ? 0 : 15, // Giảm padding trên Android nếu cần
    },
});

export default Screen;

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ISize } from '../../style/size';
import { IColor } from '../../style/color';
import useStyles from '../../style/useStyles';

const Header = () => {
    const { styles } = useStyles(createStyles);
    return (
        <View style={styles.header}>
            <Image source={require('../../../assets/logo.png')} style={{ width: 40, height: 40 }} />
            <Text style={styles.appName}>Healthy care</Text>
        </View>
    );
};

const createStyles = (size: ISize, color: IColor) =>
    StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    appName: {
        fontSize: size.h2,
        fontWeight: '700',
        marginLeft: 10,
        color: '#4a90e2',
    },
});

export default Header;

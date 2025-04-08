import { StyleSheet, Text, View } from 'react-native';
import useStyles from '../style/useStyles';
import { IColor } from '../style/color';
import { ISize } from '../style/size';
import { useAppDispatch } from '../redux/hook';
import { changeDarkMode, decreaseFontSize, increaseFontSize } from '../redux/slice/theme';


function Home() {
    const { styles } = useStyles(createStyles);
    const dispatch = useAppDispatch();

    const buttonChangeColor = () => {
        dispatch(changeDarkMode());
    }
    const buttonChangeSize = () => {
        dispatch(decreaseFontSize());
    }
    const buttonChangeSizeA = () => {
        dispatch(increaseFontSize());
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textabc}>Open up App.tsx to start working on your app!</Text>
            <Text style={styles.textabc} onPress={buttonChangeColor}>drakMode</Text>
            <Text style={styles.textabc} onPress={buttonChangeSize}>aaa</Text>
            <Text style={styles.textabc} onPress={buttonChangeSizeA}>bb</Text>
        </View>
    );
}

const createStyles = (size: ISize, color: IColor) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.backgroundColor,
            alignItems: "center",
            justifyContent: 'center',
            gap: 10,
        },
        textabc: {
            left: 0,
            fontFamily: 'Montserrat-Bold',
            color: color.textPrimary,
            fontSize: size.h1,
        },
    });
export default Home;
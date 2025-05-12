import { StyleSheet, Text, View } from 'react-native';
import useStyles from '../../style/useStyles';
import { IColor } from '../../style/color';
import { ISize } from '../../style/size';
import { useAppDispatch } from '../../redux/hook';
import { changeDarkMode} from '../../redux/slice/theme';


function ChangeColorAndSize() {

    
    const { styles } = useStyles(createStyles);
    const dispatch = useAppDispatch();

    const buttonChangeColor = () => {
        dispatch(changeDarkMode());
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textabc}>Open up App.tsx to start working on your app!</Text>
            <Text style={styles.textabc} onPress={buttonChangeColor}>drakMode</Text>
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
            color: color.text,
            fontSize: size.h1,
        },
    });
export default ChangeColorAndSize;
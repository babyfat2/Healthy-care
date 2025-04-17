
import AuthNavigation from '../navigation/AuthNavigation';
import MainNavigation from '../navigation/MainNavigation';
import TabNavigation from '../navigation/TabNavigation';
import { useAppSelector } from '../redux/hook';
import FirstScreen from './FirstScreen';


function Screen() {
    const is_first = useAppSelector((state) => state.route.is_first);
    const is_login = useAppSelector((state) => state.user.isLogin);
    if (is_first) {
        return (
            <FirstScreen />
        )
    } else {
        if (is_login) {
            return (
                <MainNavigation />
            )
        } else {
            return (
                <AuthNavigation />
            )
        }
    }
}

export default Screen;
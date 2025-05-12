import { useAppSelector } from "../redux/hook";
import { Colors, IColor } from "./color";

export default function useThemeColor(): IColor {
    const darkMode = useAppSelector((state) => state.theme.darkmode);
    
    return darkMode ? Colors.dark : Colors.light;
  }
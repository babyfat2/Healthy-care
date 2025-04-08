import { StyleSheet, } from 'react-native';
import { useMemo } from 'react';
import { useAppSelector } from '../redux/hook';
import { ISize } from './size';
import { Colors, IColor } from './color';

interface Styles<T extends StyleSheet.NamedStyles<T>> {
    size: ISize;
    color: IColor;
    styles: T;
}

export default function <T extends StyleSheet.NamedStyles<T>>(
    createStyle: (size: ISize, color: IColor) => T,
): Styles<T> {
    const fontSize = useAppSelector((state) => state.theme.fontSize);

    const size: ISize = {
        h1: 32 + fontSize,
        h2: 24 + fontSize,
        h3: 20 + fontSize,
        bodyLarge: 18 + fontSize,
        bodyMedium: 16 + fontSize,
        bodySmall: 14 + fontSize,
        caption: 12 + fontSize,
    };

    const darkMode = useAppSelector((state) => state.theme.darkmode);

    const color: IColor = darkMode ? Colors.dark : Colors.light;

    return {
        size,
        color,
        styles: useMemo(() => createStyle(size, color), [size, color, createStyle]),
    };
}
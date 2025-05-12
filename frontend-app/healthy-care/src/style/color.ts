export type IColor = {
    backgroundColor: string;
    backgroundSoft: string;
    primary: string;
    secondary: string;
    textHeader: string;
    text: string;
    textSecond: string;
    button: string;
    card: string;
    tabNavigation: string;
    border: string;
    highlight: string;
    textMuted: string;
    cardShadow: string;
};


type ColorPalettes = {
    light: IColor;
    dark: IColor;
}

export const Colors: ColorPalettes = {
    dark: {
        backgroundColor: '#0D1117',
        backgroundSoft: '#161B22',
        card: '#1E1E1E',
        tabNavigation: '#121212',
        border: '#2C2C2C',

        primary: '#AAB8D0',
        secondary: '#5F87E6',
        highlight: '#58A6FF',

        text: '#E5E7EB',
        textSecond: '#60A5FA',
        textMuted: '#6B7280',
        textHeader: '#BFDBFE',

        button: '#3B82F6',
        cardShadow: '#00000040',
    },
    light: {
        backgroundColor: '#f7fafd',
        backgroundSoft: '#F1F5F9',
        card: '#FFFFFF',
        tabNavigation: '#F3F4F6',
        border: '#E5E7EB',

        primary: '#1E3A8A',
        secondary: '#2563EB',
        highlight: '#2563EB',

        text: '#374151',
        textSecond: '#3B82F6',
        textMuted: '#9CA3AF',
        textHeader: '#1E40AF',

        button: '#3B82F6',
        cardShadow: '#00000010',
    },
};

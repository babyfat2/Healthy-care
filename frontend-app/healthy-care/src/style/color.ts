export type IColor = {
    backgroundColor: string;
    primary: string;
    secondary: string;
    textHeader: string;
    text: string;
    textSecond: string;
    button: string;
    card: string;
    tabNavigation: string;
};


type ColorPalettes = {
    light: IColor;
    dark: IColor;
}

export const Colors: ColorPalettes = {
    dark: {
        backgroundColor: '#000',
        primary: '#A9B4CD',
        secondary: '#597FE0',
        textHeader: '#1E90FF',
        text: '#fff',
        textSecond: "#1E90FF",
        button: "#1E90FF",
        card: "#2A2A2A",
        tabNavigation: '#1C1C1E',
    },
    light: {
        backgroundColor: '#FFF',
        primary: '#192252',
        secondary: '#142D92',
        textHeader: '#1E90FF',
        text: '#606D93',
        textSecond: "#1E90FF",
        button: "#1E90FF",
        card: "#F9F9F9",
        tabNavigation: '#ffffff',
    },
};


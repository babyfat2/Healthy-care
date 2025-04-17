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
        backgroundColor: '#0D1117',   // Nền tối chuẩn, giảm độ gắt
        primary: '#AAB8D0',           // Nhẹ hơn chút, dùng làm màu chính
        secondary: '#5F87E6',         // Xanh thiên nhẹ để làm nổi bật
        textHeader: '#BFDBFE',        // Xanh nhạt nổi bật (light blue-200)
        text: '#E5E7EB',              // Xám sáng cho text chính
        textSecond: '#60A5FA',        // Xanh dương nhạt hơn #1E90FF
        button: '#3B82F6',            // Xanh blue-500, dễ nhìn trong dark
        card: '#1E1E1E',              // Nền card tối nhưng phân tách
        tabNavigation: '#121212',     // Gần nền chính nhưng có độ tương phản
    },
    light: {
        backgroundColor: '#F9FAFB',    // Nền sáng nhẹ, thân thiện hơn trắng thuần
        primary: '#1E3A8A',            // Xanh navy đậm (blue-900), tạo điểm nhấn tốt
        secondary: '#2563EB',          // Blue-600, phù hợp làm accent
        textHeader: '#1E40AF',         // Blue-800, rõ ràng nhưng không quá gắt
        text: '#374151',               // Gray-700, dễ đọc, mềm mại hơn
        textSecond: '#3B82F6',         // Blue-500 – đồng bộ với dark mode
        button: '#3B82F6',             // Blue-500 – phổ biến, nổi bật
        card: '#FFFFFF',               // Card trắng tạo sự phân tách rõ ràng
        tabNavigation: '#F3F4F6',      // Gray-100, nhẹ nhàng hơn full trắng
    },
};


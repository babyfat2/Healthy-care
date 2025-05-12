import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ISize } from '../../style/size';
import { IColor } from '../../style/color';
import useStyles from '../../style/useStyles';
import { Ionicons } from '@expo/vector-icons'; // cần cài đặt: expo install @expo/vector-icons

const formatDate = (date: Date) => date.toISOString().split('T')[0]; // YYYY-MM-DD

const ChooseDate = ({
    selectedDate,
    setSelectedDate
}: {
    selectedDate: string,
    setSelectedDate: (value: string) => void,
}) => {
    const [showPicker, setShowPicker] = useState(false);
    const { styles } = useStyles(createStyles);

    const onChangeDate = (event: any, selected?: Date) => {
        setShowPicker(false);
        if (selected) {
            setSelectedDate(formatDate(selected));
        }
    };

    return (
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <TouchableOpacity
                onPress={() => setShowPicker(true)}
                style={styles.dateButton}
                activeOpacity={0.8}
            >
                <Ionicons name="calendar-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.dateButtonText}>Chọn ngày: {selectedDate}</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={new Date(selectedDate)}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChangeDate}
                />
            )}
        </View>
    );
};

const createStyles = (size: ISize, color: IColor) =>
    StyleSheet.create({
        dateButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: color.button,
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
        },
        dateButtonText: {
            color: '#fff',
            fontSize: size.bodyMedium,
            fontWeight: '600',
        },
    });

export default ChooseDate;

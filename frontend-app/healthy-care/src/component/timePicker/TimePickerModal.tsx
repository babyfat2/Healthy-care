import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
    visible: boolean;
    onClose: () => void;
    timesCount?: number;
    onTimesSelected: (times: string[]) => void;
};

const TimePickerModal = ({
    visible,
    onClose,
    timesCount = 3,
    onTimesSelected,
}: Props) => {
    const [reminderTimes, setReminderTimes] = useState<(string | null)[]>(Array(timesCount).fill(null));
    const [showPicker, setShowPicker] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [tempTime, setTempTime] = useState(new Date());

    const isAllSelected = reminderTimes.every(time => time !== null);

    const compareTimeString = (timeStr: string | null, newMinutes: number, op: '<' | '>') => {
        if (!timeStr) return true;

        const [h, m] = timeStr.split(':').map(Number);
        const existingMinutes = h * 60 + m;

        return op === '<' ? newMinutes > existingMinutes : newMinutes < existingMinutes;
    };

    const handleTimeChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') setShowPicker(false);
        if (selectedDate && currentIndex !== null) {
            const selectedTime = selectedDate.getHours() * 60 + selectedDate.getMinutes();

            const isValid =
                (currentIndex === 0 || compareTimeString(reminderTimes[currentIndex - 1], selectedTime, '<')) &&
                (currentIndex === reminderTimes.length - 1 || compareTimeString(reminderTimes[currentIndex + 1], selectedTime, '>'));

            if (!isValid) {
                alert('Thời gian phải lớn hơn lần trước và nhỏ hơn lần sau.');
                return;
            }

            const updated = [...reminderTimes];
            updated[currentIndex] = selectedDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });
            setReminderTimes(updated);
        }
    };

    const handlePressTime = (index: number) => {
        setCurrentIndex(index);
        setTempTime(new Date());
        setShowPicker(true);
    };

    const handleDone = () => {
        if (isAllSelected) {
            onTimesSelected(reminderTimes.map(t => t ?? ''));
            onClose();
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <Text style={styles.title}>Chọn giờ uống thuốc</Text>

                    {reminderTimes.map((time, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.timeButton}
                            onPress={() => handlePressTime(index)}
                        >
                            <Text style={styles.timeText}>
                                {time ? `🕒 Lần ${index + 1}: ${time}` : `➕ Chọn giờ lần ${index + 1}`}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    {showPicker && (
                        <DateTimePicker
                            value={tempTime}
                            mode="time"
                            display="spinner"
                            onChange={handleTimeChange}
                        />
                    )}

                    <TouchableOpacity
                        style={[
                            styles.doneButton,
                            { backgroundColor: isAllSelected ? '#4a90e2' : '#ccc' },
                        ]}
                        onPress={handleDone}
                        disabled={!isAllSelected}
                    >
                        <Text style={styles.doneText}>Xong</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default TimePickerModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
        width: '85%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2d3436',
        marginBottom: 20,
    },
    timeButton: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: '#f1f6fb',
        borderRadius: 12,
        marginTop: 12,
        width: '100%',
    },
    timeText: {
        fontSize: 16,
        color: '#2d3436',
        textAlign: 'center',
    },
    doneButton: {
        marginTop: 25,
        paddingVertical: 12,
        borderRadius: 12,
        width: '100%',
    },
    doneText: {
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 16,
    },
});

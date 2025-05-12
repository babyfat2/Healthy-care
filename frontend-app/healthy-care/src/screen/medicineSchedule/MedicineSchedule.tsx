import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import ChooseDate from '../../component/SelectDate/ChooseDate';
import Header from '../../component/header/Header';
import { useLazyGetPrescriptionQuery } from '../../redux/api/prescription';
import TimePickerModal from '../../component/timePicker/TimePickerModal';
import { useAppSelector } from '../../redux/hook';
import GroupedMedicines from '../../component/groupMedicines/GroupMedicine';
import { configureNotifications } from '../../utils/notification/notificationConfig';
import { scheduleMultipleDailyNotifications } from '../../utils/notification/notificationScheduler';
import * as Notifications from 'expo-notifications';
import useStyles from '../../style/useStyles';
import { ISize } from '../../style/size';
import { IColor } from '../../style/color';

const now = new Date();
const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
const today = new Date(utc + (7 * 60 * 60000)); // GMT+7

const formatDate = (date: Date) => date.toISOString().split('T')[0]; // YYYY-MM-DD

const MedicineSchedule = () => {
    const { styles, color } = useStyles(createStyles);
    const [selectedDate, setSelectedDate] = useState(formatDate(today));
    const [prescriptionCode, setPrescriptionCode] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [showTimeModal, setShowTimeModal] = useState(true);
    const [times, setTimes] = useState<string[]>([]);
    const data = useAppSelector((state) => state.prescription.medicine);

    const [trigger] = useLazyGetPrescriptionQuery();

    const handleConfirmCode = async () => {
        setError('');
        if (prescriptionCode.trim()) {
            const res = await trigger({ id: prescriptionCode })
                .unwrap()
                .then((e) => {
                    if (!e.data.is_first) {
                        setShowTimeModal(false);
                    }
                    setSubmitted(true); // Chuyển sang màn hình chọn lịch sau khi fetch thành công
                })
                .catch(e => {
                    if (e.data.status === 404) {
                        setError('Không tìm thấy đơn thuốc. Vui lòng kiểm tra lại mã.');
                    } else {
                        setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
                    }
                });
        }
    };


    useEffect(() => {
        const setup = async () => {
            await configureNotifications();

            await Notifications.cancelAllScheduledNotificationsAsync();

            await scheduleMultipleDailyNotifications(
                [
                    { hour: new Date().getHours(), minute: new Date().getMinutes() + 1 },
                ],
                'Đã đến giờ uống thuốc',
                'Đừng quên uống thuốc đúng giờ nhé!'
            );
        };

        setup();
    }, []);

    return (
        <View style={styles.container}>
            <Header />
            {!submitted ? (
                <View style={styles.inputWrapper}>
                    <Text style={styles.title}>Nhập mã đơn thuốc</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="VD: RX123456"
                        value={prescriptionCode}
                        placeholderTextColor={color.textMuted} // thay vì color.text để phân biệt placeholder
                        onChangeText={setPrescriptionCode}
                    />
                    {error !== '' && (
                        <Text style={styles.errorText}>{error}</Text>
                    )}
                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmCode}>
                        <Text style={styles.confirmButtonText}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.taskList}>
                        <ChooseDate
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                        <TimePickerModal
                            visible={showTimeModal}
                            onClose={() => setShowTimeModal(false)}
                            onTimesSelected={(selectedTimes) => {
                                setTimes(selectedTimes);
                            }}
                        />
                        <GroupedMedicines
                            date={selectedDate}
                        />
                    </ScrollView>
                </>
            )}
        </View>
    );
};

const createStyles = (size: ISize, color: IColor) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: color.backgroundColor,
            paddingHorizontal: 16,
        },
        inputWrapper: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },
        title: {
            fontSize: 20,
            fontWeight: '600',
            marginBottom: 16,
            color: color.text,
        },
        input: {
            borderWidth: 1,
            borderColor: color.border,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            width: '100%',
            color: color.text,
            fontSize: 16,
            backgroundColor: color.backgroundSoft, // nền input phân biệt
        },
        confirmButton: {
            backgroundColor: color.button,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 10,
            marginTop: 16,
            shadowColor: color.cardShadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
        },
        confirmButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
        },
        errorText: {
            color: '#EF4444',
            marginTop: 8,
            fontSize: 14,
            textAlign: 'center',
        },
        taskList: {
            paddingBottom: 24,
        },
    });

export default MedicineSchedule;

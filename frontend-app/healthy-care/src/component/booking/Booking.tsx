import React, { useState } from "react";
import {
    TouchableOpacity,
    Text,
    Modal,
    StyleSheet,
    View,
    TextInput,
    Platform,
    Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useBookingMutation } from "../../redux/api/hospital";

const BookingButton = ({ 
    hospital_id 
}: {
    hospital_id: number,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [description, setDescription] = useState("");
    const [error, setError] = useState('');
    const [booking] = useBookingMutation();

    // Tính ngày mai cho minimumDate
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const onChangeDate = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
            if (error) setError('');
        }
        setShowPicker(false);
    };

    const handleConfirm = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selected = new Date(date);
        selected.setHours(0, 0, 0, 0);

        if (selected <= today) {
            setError("Vui lòng chọn ngày khám hợp lệ trong tương lai.");
            return;
        }

        if (!description.trim()) {
            setError("Vui lòng nhập mô tả triệu chứng hoặc bệnh.");
            return;
        }

        setError(""); // Xoá lỗi nếu hợp lệ
        console.log("aaa");
        booking({hospital_id, description, appointment_time: date})
        .unwrap()
        .then((e) => {
            console.log(e);
        })
        .catch((err) => {
            console.log(err);
        })

        setModalVisible(false);
        setDescription("");
        setDate(new Date());
    };

    return (
        <>
            <TouchableOpacity
                style={styles.bookingButton}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons
                    name="calendar-outline"
                    size={22}
                    color="white"
                    style={styles.buttonIcon}
                />
                <Text style={styles.bookingText}>Đặt lịch khám</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <StatusBar />
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Đặt lịch khám</Text>

                        <TouchableOpacity
                            onPress={() => setShowPicker(true)}
                            style={styles.datePickerBox}
                        >
                            <Ionicons name="calendar-outline" size={20} color="#4c8bf5" style={{ marginRight: 10 }} />
                            <Text style={styles.dateText}>
                                {date.toLocaleDateString("vi-VN")}
                            </Text>
                        </TouchableOpacity>

                        {showPicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                onChange={onChangeDate}
                                minimumDate={tomorrow} // Chỉ cho phép chọn từ ngày mai trở đi
                            />
                        )}

                        {error !== '' && (
                            <Text style={styles.errorText}>{error}</Text>
                        )}
                        {/* Hộp mô tả với chiều cao lớn hơn và nhiều dòng */}
                        <TextInput
                            placeholder="Nhập mô tả triệu chứng hoặc bệnh..."
                            value={description}
                            onChangeText={(text) => {
                                setDescription(text);
                                if (error) setError('');
                            }}
                            style={styles.textInput}
                            multiline
                            textAlignVertical="top"
                            numberOfLines={6}
                        />

                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonWrapper}>
                                <Button title="Xác nhận" onPress={handleConfirm} color="#2196F3" />
                            </View>
                            <View style={styles.buttonWrapper}>
                                <Button
                                    title="Hủy"
                                    onPress={() => setModalVisible(false)}
                                    color="#f44336"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    bookingButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "#4c8bf5", // màu xanh đậm, có thể thay bằng gradient nếu dùng LinearGradient
        // Shadow cho iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        // Elevation cho Android
        elevation: 4,
        margin: 15,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        fontSize: 14,
    },
    buttonIcon: {
        marginRight: 8,
    },
    bookingText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    datePickerBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: "#f9f9f9",
    },
    dateText: {
        fontSize: 16,
        color: "#333",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    modalBox: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    dateButton: {
        padding: 15,
        backgroundColor: "#eee",
        borderRadius: 8,
        marginBottom: 15,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 15,
        height: 120, // tăng chiều cao để mô tả dài hơn
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default BookingButton;

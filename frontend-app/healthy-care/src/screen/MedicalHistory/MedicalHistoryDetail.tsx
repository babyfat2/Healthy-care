import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ISize } from '../../style/size';
import { IColor } from '../../style/color';
import useStyles from '../../style/useStyles';
import {  MedicalHistoryDetailNavigationProp } from '../../type/navigation';
import { useGetMedicalDetailQuery } from '../../redux/api/medical';


const prescribedMedicines = [
  { id: '1', name: 'Paracetamol 500mg', usage: 'Uống 1 viên mỗi 6 giờ khi sốt' },
  { id: '2', name: 'Amoxicillin 500mg', usage: 'Uống 1 viên x 3 lần/ngày, sau ăn' },
  { id: '3', name: 'Vitamin C', usage: 'Uống 1 viên mỗi sáng' },
];

const MedicalHistoryDetail = ({ navigation, route }: MedicalHistoryDetailNavigationProp) => {
  const { styles, color } = useStyles(createStyles);
   const appointment_id = route.params.appointment_id;
    const data = useGetMedicalDetailQuery({ id: appointment_id }).data?.data;


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Nút Go Back */}
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={color.secondary} />
        <Text style={styles.goBackText}>Chi tiết lần khám</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Thông tin bệnh viện</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Tên:</Text>
        <Text style={styles.value}>{data?.hospital.name}</Text>
        <Text style={styles.label}>Địa chỉ:</Text>
        <Text style={styles.value}>{data?.hospital.address}</Text>
        <Text style={styles.label}>Số điện thoại:</Text>
        <Text style={styles.value}>{data?.hospital.phone}</Text>
      </View>


      <Text style={styles.sectionTitle}>Chẩn đoán</Text>
<View style={styles.card}>
  <Text style={styles.value}>{data?.prescription.diagnosis}</Text>
</View>

<Text style={styles.sectionTitle}>Thuốc được kê</Text>
<View style={styles.card}>
  {data?.prescription.prescriptionMedicine.map((med) => (
    <View key={med.id} style={styles.medicineItem}>
      <Text style={styles.medicineName}>{med.medicine.name}</Text>
      <Text style={styles.medicineUsage}>Mô tả: {med.medicine.description}</Text>
      <Text style={styles.medicineUsage}>Liều dùng: {med.dose_quantity} viên x {med.timesPerDay} lần/ngày</Text>
      <Text style={styles.medicineUsage}>Số lượng: {med.amount}</Text>
      <Text style={styles.medicineUsage}>Thời gian dùng: {med.start_time} → {med.end_time}</Text>
      <Text style={styles.medicineUsage}>Ghi chú: {med.note}</Text>
      <Text style={styles.medicineUsage}>Xuất xứ: {med.medicine.origin} - Dạng: {med.medicine.form}</Text>
      <Text style={styles.medicineUsage}>Giá: {med.medicine.price.toLocaleString()}đ</Text>
    </View>
  ))}
</View>

    </ScrollView>
  );
};

const createStyles = (size: ISize, color: IColor) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
    padding: 16,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  goBackText: {
    marginLeft: 8,
    fontSize: size.h2,
    color: color.primary,
  },
  sectionTitle: {
    fontSize: size.h3,
    fontWeight: 'bold',
    marginVertical: 12,
    color: color.textHeader,
  },
  card: {
    backgroundColor: color.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontWeight: '600',
    color: color.textSecond,
    marginTop: 6,
  },
  value: {
    color: color.text,
    marginBottom: 4,
  },
  medicineItem: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 8,
  },
  medicineName: {
    fontWeight: '600',
    fontSize: size.bodyMedium,
    color: color.textSecond,
  },
  medicineUsage: {
    color: color.text,
    fontSize: size.bodySmall,
  },
});

export default MedicalHistoryDetail;

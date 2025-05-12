import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useLazyGetMedicalQuery } from '../../redux/api/medical';
import { IMedical } from '../../type/api';
import { MedicalHistoryNavigationProp } from '../../type/navigation';
import useStyles from '../../style/useStyles';
import { ISize } from '../../style/size';
import { IColor } from '../../style/color';




const MedicalHistory = ({ navigation }: MedicalHistoryNavigationProp) => {
  const { styles } = useStyles(createStyles);
  const [trigger, {data}] = useLazyGetMedicalQuery();

  useEffect(() => {
    trigger(null)
  },)

  const gotoDetail =  (id : string, status: string) => {
    if (status == "Hoàn thành") {
    navigation.navigate("MedicalHistoryDetail", {appointment_id: id})
    }
  }

  const renderItem = ({ item }: { item: IMedical }) => (
    <TouchableOpacity style={styles.card} onPress={() => gotoDetail(item.id, item.status)}>
      <View style={styles.row}>
        <Text style={styles.label}>Bệnh viện:</Text>
        <Text style={styles.value}>{item.hospital.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Thời gian:</Text>
        <Text style={styles.value}>{item.appointment_time}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Trạng thái:</Text>
        <Text
          style={[
            styles.status,
            item.status === 'Hoàn thành' ? styles.completed : styles.pending,
          ]}
        >
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử khám bệnh</Text>
      <FlatList
        data={data?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

const createStyles = (size: ISize, color: IColor) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: size.h2,
    fontWeight: 'bold',
    marginBottom: 20,
    color: color.textHeader,
  },
  card: {
    backgroundColor: color.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    width: 90,
    fontWeight: '600',
    color: color.textSecond,
  },
  value: {
    flex: 1,
    color: color.text,
  },
  status: {
    fontWeight: 'bold',
  },
  completed: {
    color: 'green',
  },
  pending: {
    color: 'orange',
  },
});

export default MedicalHistory;

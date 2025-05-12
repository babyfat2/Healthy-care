import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import useStyles from '../../style/useStyles';
import { IColor } from '../../style/color';
import { ISize } from '../../style/size';
import { Ionicons } from '@expo/vector-icons';
import { useLazyGetListMedicineQuery } from '../../redux/api/medicine';
import Header from '../../component/header/Header';


export default function MedicineListScreen() {
  const { styles, color } = useStyles(createStyles);

  const [trigger, data] = useLazyGetListMedicineQuery();

  const [search, setSearch] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let dataQuery = {};
    if (search) {
      Object.assign(dataQuery, { "search": search });
    }
    trigger(dataQuery); // Gọi API
  }, [search]);

  return (
      <View style={styles.container}>
        <Header />
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={color.primary} style={styles.searchIcon} />
          <TextInput
            placeholder="Tìm theo tên hoặc mã thuốc..."
            placeholderTextColor={color.primary}
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        <FlatList
          data={data?.data?.data}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setSelectedMedicine(item);
                setModalVisible(true);
              }}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.code}>{item.code}</Text>
            </TouchableOpacity>
          )}
        />

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedMedicine && (
                <>
                  <Text style={styles.title}>{selectedMedicine.name}</Text>
                  <Text style={styles.detail}>Mã thuốc: {selectedMedicine.code}</Text>
                  <Text style={styles.detail}>Xuất xứ: {selectedMedicine.origin}</Text>
                  <Text style={styles.detail}>Mô tả: {selectedMedicine.description || 'Không có mô tả'}</Text>
                  <Text style={styles.detail}>Dạng thuốc: {selectedMedicine.form || 'Không rõ'}</Text>
                  <Text style={styles.detail}>Giá: {selectedMedicine.price.toLocaleString()} VND</Text>
                </>
              )}
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={{ color: 'white' }}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
  );
}

const createStyles = (size: ISize, color: IColor) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 0,
      backgroundColor: color.backgroundColor,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: color.primary,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 12,
      backgroundColor: color.backgroundColor,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: color.text, // <-- Màu chữ nhập vào
      paddingVertical: 10,
    },

    item: {
      padding: 16,
      backgroundColor: color.card,
      marginBottom: 10,
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    name: {
      fontSize: size.bodyMedium,
      fontWeight: '600',
      color: color.secondary,
    },
    code: {
      fontSize: size.bodySmall,
      color: color.primary,
      marginTop: 4,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      backgroundColor: color.card,
      padding: 20,
      borderRadius: 12,
      elevation: 5,
    },
    title: {
      fontSize: size.h2,
      fontWeight: 'bold',
      marginBottom: 10,
      color: color.secondary,
    },
    detail: {
      fontSize: size.bodySmall,
      color: color.text,
    },
    closeButton: {
      marginTop: 20,
      backgroundColor: '#2196F3',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
  });

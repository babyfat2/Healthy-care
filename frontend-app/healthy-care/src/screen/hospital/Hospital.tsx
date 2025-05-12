import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import { useLazyGetListHospitalQuery } from '../../redux/api/hospital';
import { IHospital } from '../../type/api';
import { HospitalNavigationProp } from '../../type/navigation';
import useStyles from '../../style/useStyles';
import { createHospitalStyles } from './HospitalStyle';
import { useAppSelector } from '../../redux/hook';
import Header from '../../component/header/Header';

const defaultImage = 'https://cdn-icons-png.flaticon.com/512/888/888064.png';

const Hospital = ({ navigation }: HospitalNavigationProp) => {

  const { styles } = useStyles(createHospitalStyles);

  const [search, setSearch] = useState(''); // trạng thái trang tìm kiếm
  const [sortByDistance, setSortByDistance] = useState(false); // sắp xếp theo khoảng cách
  const [trigger] = useLazyGetListHospitalQuery(); // hàm gọi api
  const [latitude, setLatitude] = useState<number>(); // tọa độ
  const [longitude, setLongitude] = useState<number>(); // vĩ độ
  const [hospitals, setHospitals] = useState<IHospital[]>([]); // dữ liệu bệnh viện
  const [page, setPage] = useState(1); // số trang hiện tại
  const [isLoadingMore, setIsLoadingMore] = useState(false); // hiển thị giao diện đợi load trang
  const [hasMore, setHasMore] = useState(true); // còn dữ liệu hay ko
  const [isFetchingLocation, setIsFetchingLocation] = useState(false); // việc lấy vị trí đã xong hay chưa
  const [query, setQuery] = useState<any>({
    page: 1,
    row: 7,
  }); // câu lệnh truy vấn
  const isFirstRender = useRef(true);


  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return
    }
    let dataQuery = { page: 1, row: 7 };
    // thêm vị trí
    if (longitude && latitude) {
      Object.assign(dataQuery, { "latitude": latitude, "longitude": longitude })
      setSortByDistance(true);
    }

    if (search) {
      Object.assign(dataQuery, { "search": search })
    }
    setPage(1);
    setHasMore(true);
    setQuery(dataQuery);

  }, [longitude, search]);


  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await trigger(query).unwrap();
        setHospitals(res.data || []);
      } catch (error) {
        console.error('Lỗi fetch:', error);
        setHospitals([]);
      }
    };

    fetchHospitals();
  }, [query]);

  // tìm bệnh viện theo địa chỉ gần nhất
  const getLocation = async () => {
    if (sortByDistance) {
      setSortByDistance(false);
      setLatitude(undefined);
      setLongitude(undefined);
    } else {
      setIsFetchingLocation(true);
      try {
        // Yêu cầu quyền truy cập vị trí
        let { status } = await Location.requestForegroundPermissionsAsync();
        // thông báo nếu bị từ chối
        if (status !== 'granted') {
          Alert.alert('Quyền bị từ chối', 'Không thể lấy vị trí nếu không có quyền!');
          return;
        }

        // Lấy vị trí hiện tại
        let location = await Location.getCurrentPositionAsync({});

        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);

      } catch (error) {
        Alert.alert('Lỗi', 'Không thể lấy vị trí');
      }
      setIsFetchingLocation(false);
    }
  };

  // kéo xuống để lấy thêm dữ liệu
  const loadMoreHospitals = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const result = await trigger({ ...query, page: page + 1 }).unwrap();
    const newData = result.data || [];

    if (newData.length === 0) {
      setHasMore(false); // Không còn dữ liệu nữa
    } else {
      setHospitals(prev => [...prev, ...newData]);
      setPage(prev => prev + 1);
    }

    setIsLoadingMore(false);
  };

  const renderFooter = () => {
    if (isLoadingMore) {
      return (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <Text>Đang tải thêm...</Text>
        </View>
      );
    }

    if (!hasMore) {
      return (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <Text>Đã tải hết danh sách.</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm bệnh viện..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={[
            styles.sortCompactButton,
            sortByDistance && styles.sortCompactButtonActive,
          ]}
          onPress={getLocation}
          disabled={isFetchingLocation}
        >
          <Text
            style={[
              styles.sortCompactText,
              sortByDistance && styles.sortCompactTextActive,
            ]}
          >
            {isFetchingLocation ? 'Đang lấy vị trí...' : '🏥 Gần nhất'}
          </Text>

        </TouchableOpacity>
      </View>

      <FlatList
        data={hospitals}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("HospitalDetail", { hospital_id: item.id })}
          >
            <Image
              source={{ uri: item.avatar ? item.avatar : defaultImage }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.hospitalName}>{item.name}</Text>
              <Text style={styles.hospitalAddress}>{item.address}</Text>
              {sortByDistance && (
                <Text style={styles.hospitalDistance}>
                  📍 {item.distance && parseFloat(item.distance).toFixed(2)} km
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        onEndReached={loadMoreHospitals}
        onEndReachedThreshold={0.9}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default Hospital;
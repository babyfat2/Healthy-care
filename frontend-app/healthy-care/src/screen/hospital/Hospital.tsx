import React, { useEffect, useState } from 'react';
import { Text, View, Button, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function Hospital() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    try {
      // Yêu cầu quyền truy cập vị trí
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Quyền bị từ chối', 'Không thể lấy vị trí nếu không có quyền!');
        setLoading(false);
        return;
      }

      // Lấy vị trí hiện tại
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lấy vị trí');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Lấy vị trí hiện tại" onPress={getLocation} />
      {loading && <ActivityIndicator />}
      {location && (
        <Text>
          Latitude: {location.coords.latitude}{"\n"}
          Longitude: {location.coords.longitude}
        </Text>
      )}
    </View>
  );
}

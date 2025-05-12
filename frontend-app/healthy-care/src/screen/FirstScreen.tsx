import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../redux/hook';
import { joinApp } from '../redux/slice/route';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Chào mừng đến với ứng dụng!',
    description: 'Trợ lý sức khỏe thông minh giúp bạn không bao giờ quên liều thuốc nào.',
  },
  {
    id: '2',
    title: 'Theo dõi lịch uống thuốc',
    description: 'Dễ dàng quản lý lịch uống, nhận thông báo và đánh dấu đã uống thuốc.',
  },
  {
    id: '3',
    title: 'Bắt đầu chăm sóc sức khỏe ngay!',
    description: 'Tạo tài khoản hoặc đăng nhập để theo dõi việc dùng thuốc mỗi ngày.',
  },
];


const FirstScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      // @ts-ignore
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      dispatch(joinApp());
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Logo và tên ứng dụng */}
      {/* Logo và tên ứng dụng */}

      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        renderItem={({ item }) => (
          <View style={{ width, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
    {/* Logo và tên ứng dụng trong từng slide */}
    <Image
      source={require('../../assets/logo.png')}
      style={{ width: 120, height: 120, resizeMode: 'contain', marginBottom: 10 }}
    />
    <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#007BFF', marginBottom: 20 }}>
      Healthy care
    </Text>

    <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>
      {item.title}
    </Text>
    <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginTop: 10 }}>
      {item.description}
    </Text>
  </View>
        )}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: index === currentIndex ? '#000' : '#ccc',
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={handleNext}
        style={{
          backgroundColor: '#000',
          padding: 15,
          borderRadius: 10,
          marginHorizontal: 20,
          marginBottom: 40,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
          {currentIndex === slides.length - 1 ? 'Bắt đầu' : 'Tiếp theo'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FirstScreen;

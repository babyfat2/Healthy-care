import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../redux/hook';
import { joinApp } from '../redux/slice/route';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Chào mừng đến với Ứng dụng!',
    description: 'Giải pháp tiện lợi để quản lý công việc của bạn mọi lúc mọi nơi.',
  },
  {
    id: '2',
    title: 'Theo dõi lịch trình',
    description: 'Dễ dàng xem và cập nhật các công việc hàng ngày.',
  },
  {
    id: '3',
    title: 'Bắt đầu ngay!',
    description: 'Tạo tài khoản hoặc đăng nhập để sử dụng ngay bây giờ.',
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
        
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>{item.title}</Text>
            <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginTop: 10 }}>{item.description}</Text>
          </View>
        )}
      />

      {/* Chấm tròn hiển thị vị trí trang hiện tại */}
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

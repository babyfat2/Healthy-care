import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HospitalDetailNavigationProp } from "../../type/navigation";
import { useGetDetailHospitalQuery } from "../../redux/api/hospital";
import { Ionicons } from "@expo/vector-icons";
import { IHospitalImage } from "../../type/api";
import PagerView from "react-native-pager-view";
import useStyles from "../../style/useStyles";
import { createHospitalDetailStyles } from "./HospitalDetalStyle";
import BookingButton from "../../component/booking/Booking";

const HospitalDetail = ({ navigation, route }: HospitalDetailNavigationProp) => {
  const { styles } = useStyles(createHospitalDetailStyles);
  const hospital_id = route.params.hospital_id;
  const data = useGetDetailHospitalQuery({ id: hospital_id }).data?.data;

  const handleBooking = () => {
    
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 140 }}>
        <View style={styles.heroContainer}>
          {data?.hospitalImage && (
            <PagerView style={styles.pagerView} initialPage={0}>
              {data.hospitalImage.map((item: IHospitalImage, index: number) => (
                <View key={index}>
                  <Image
                    source={{ uri: item.image_uri }}
                    style={styles.heroImage}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </PagerView>
          )}
        </View>

        {/* Tên bệnh viện sau ảnh */}
        {data?.name && (
          <Text style={styles.hospitalName}>{data.name}</Text>
        )}

        {/* Tổng quan mô tả */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            <Text style={styles.bold}>📍 Địa chỉ: </Text>
            {data?.address}{"\n\n"}

            {data?.phone && (
              <>
                <Text style={styles.bold}>📞 Điện thoại: </Text>
                {data.phone}{"\n\n"}
              </>
            )}

            {data?.email && (
              <>
                <Text style={styles.bold}>📧 Email: </Text>
                {data.email}{"\n\n"}
              </>
            )}

            <Text style={styles.bold}>🏥 Giới thiệu: </Text>
            {data?.description}
          </Text>
        </View>
      </ScrollView>

      {/* Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="white" />
      </TouchableOpacity>

      {/* Nút đặt lịch */}
        <BookingButton
          hospital_id={hospital_id}
        />
    </View>
  );
};


export default HospitalDetail;

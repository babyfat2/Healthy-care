import { Dimensions, StyleSheet } from "react-native";
import { ISize } from "../../style/size";
import { IColor } from "../../style/color";

const { width } = Dimensions.get("window");

export const createHospitalDetailStyles = (size: ISize, color: IColor) =>
  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor,
      },
      screen: {
        backgroundColor: color.backgroundColor,
      },
      heroContainer: {
        position: "relative",
        height: 240,
        width: "100%",
      },
      heroImage: {
        width,
        height: 260,
      },
      pagerView: {
        width,
        height: 240,
      },
      hospitalName: {
        fontSize: size.h2,
        fontWeight: "700",
        color: color.textSecond,
        marginTop: 16,
        paddingHorizontal: 20,
      },
      descriptionContainer: {
        marginTop: 24,
        paddingHorizontal: 20,
      },
      descriptionText: {
        fontSize: size.bodyMedium,
        color: color.text,
        lineHeight: 24,
      },
      bold: {
        fontWeight: "600",
        color: color.textSecond,
      },
      bookingButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: "row",
        backgroundColor: "#2563EB",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 6,
      },
      bookingText: {
        color: "white",
        fontSize: size.bodyMedium,
        fontWeight: "600",
      },

      backButton: {
        position: "absolute",
        top: 25, // Đặt nút ở vị trí phù hợp với header
        left: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 5,
        borderRadius: 40,
      },
  });
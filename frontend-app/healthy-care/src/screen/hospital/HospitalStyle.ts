import { Dimensions, StyleSheet } from "react-native";
import { ISize } from "../../style/size";
import { IColor } from "../../style/color";


export const createHospitalStyles = (size: ISize, color: IColor) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 0,
      backgroundColor: color.backgroundColor,
    },
    title: {
      fontSize: size.h2,
      fontWeight: '700',
      marginBottom: 12,
      color: color.text,
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    searchInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginRight: 8,
      color: color.text,
    },
    sortCompactButton: {
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: color.card,
    },
    sortCompactButtonActive: {
      backgroundColor: '#2ecc71',
    },
    sortCompactText: {
      fontSize: size.bodyMedium,
      fontWeight: '600',
      color: color.text,
    },
    sortCompactTextActive: {
      color: '#fff',
    },
    card: {
      flexDirection: 'row',
      backgroundColor: color.card,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      padding: 10,
      borderRadius: 10,
      marginBottom: 12,
      alignItems: 'center',
    },
    image: {
      width: 64,
      height: 64,
      borderRadius: 8,
      marginRight: 12,
      backgroundColor: '#e0e0e0',
    },
    infoContainer: {
      flex: 1,
    },
    hospitalName: {
      fontSize: size.bodyMedium,
      fontWeight: '600',
      color: color.textSecond,
    },
    hospitalAddress: {
      color: color.text,
      fontSize: size.bodySmall,
    },
    hospitalDistance: {
      marginTop: 4,
      color: color.text,
      fontWeight: '500',
    },
  });
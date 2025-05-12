import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ISize } from '../../style/size';
import { IColor } from '../../style/color';
import useStyles from '../../style/useStyles';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { doneMedicine } from '../../redux/slice/prescription_data';

const SCREEN_WIDTH = Dimensions.get('window').width;
const formatDate = (date: Date) => date.toISOString().split('T')[0];

const GroupedMedicines = ({ date }: { date: string }) => {
    const medicineData = useAppSelector((state) => state.prescription.medicine);
    const [schedule, setSchedule] = useState(medicineData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setSchedule(medicineData);
    }, [medicineData]);

    const filteredSchedule = schedule.filter((item) => {
        const start = formatDate(new Date(item.startDate));
        const end = formatDate(new Date(item.endDate));
        return date >= start && date <= end;
    });

    const groupedByTime = filteredSchedule.reduce((acc, item) => {
        if (!acc[item.time]) acc[item.time] = [];
        acc[item.time].push(item);
        return acc;
    }, {} as Record<string, typeof medicineData>);

    const { styles } = useStyles(createStyles);

    const toggleTaken = (id: string, time: string) => {
        dispatch(doneMedicine({ id, time, date }));
    };

    if (Object.keys(groupedByTime).length === 0) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>Không có thuốc nào vào ngày này</Text>
            </View>
        );
    }

    return Object.entries(groupedByTime).map(([time, meds]) => {
        const isAllTaken = meds.every((m) => m.takenDates.includes(date));
        return (
            <View key={time} style={styles.timeGroupCard}>
                <View style={styles.timeGroupHeader}>
                    <Text style={[styles.taskTime, isAllTaken && styles.takenText]}>{time}</Text>
                    <Text
                        style={[
                            styles.taskStatus,
                            isAllTaken ? styles.statusDone : styles.statusPending,
                        ]}
                    >
                        {isAllTaken ? '✓ Đã uống' : 'Chưa uống'}
                    </Text>
                </View>

                <View style={styles.medicineGroup}>
                    {meds.map((item) => {
                        const isTaken = item.takenDates.includes(date);
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.medicineCard,
                                    isTaken && styles.medicineCardTaken,
                                ]}
                                onPress={() => toggleTaken(item.id, item.time)}
                            >
                                {isTaken && <Text style={styles.checkIcon}>✓</Text>}
                                <Text style={styles.medicineName}>{item.name}</Text>
                                <Text style={styles.dosageText}>{item.dosage}</Text>
                                {item.note ? (
                                    <Text style={styles.noteText}>{item.note}</Text>
                                ) : null}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    });
};

const createStyles = (size: ISize, color: IColor) =>
    StyleSheet.create({
        timeGroupCard: {
            backgroundColor: color.card,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOpacity: 0.4,
            shadowRadius: 4,
            shadowOffset: { width: 1, height: 2 },
            elevation: 1,
        },
        timeGroupHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        taskTime: {
            fontSize: size.bodyLarge,
            color: color.textMuted,
        },
        takenText: {
            textDecorationLine: 'line-through',
            color: color.textMuted,
        },
        taskStatus: {
            fontSize: size.bodyMedium,
            fontWeight: '600',
        },
        statusPending: {
            color: '#f39c12',
        },
        statusDone: {
            color: color.highlight,
        },
        medicineGroup: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 12,
        },
        medicineCard: {
            width: (SCREEN_WIDTH - 76) / 2,
            backgroundColor: color.backgroundSoft,
            padding: 12,
            borderRadius: 10,
            shadowColor: color.cardShadow,
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 1,
        },
        medicineCardTaken: {
            opacity: 0.6,
            backgroundColor: color.backgroundSoft, // dùng màu cùng tông, mờ hơn
            borderWidth: 1,
            borderColor: color.border,
        },
        medicineName: {
            fontSize: size.bodyMedium,
            fontWeight: '600',
            color: color.text,
            marginBottom: 4,
        },
        dosageText: {
            fontSize: size.bodySmall,
            color: color.textSecond,
        },
        noteText: {
            fontSize: size.bodySmall,
            color: color.textMuted,
            fontStyle: 'italic',
            marginTop: 4,
        },
        noDataContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        noDataText: {
            fontSize: size.bodyLarge,
            color: color.textMuted,
            fontWeight: '500',
        },
        checkIcon: {
            position: 'absolute',
            bottom: 10,
            right: 8,
            fontSize: size.bodySmall,
            color: color.highlight,
            fontWeight: 'bold',
        },
    });

export default GroupedMedicines;

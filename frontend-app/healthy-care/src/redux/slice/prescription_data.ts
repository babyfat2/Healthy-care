import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/auth';
import { prescriptionApi } from '../api/prescription';
import { IDosageSchedules, IMedicinePresciption } from '../../type/api';

const mapToMedicineData = (prescriptionMedicine: IMedicinePresciption[]): IMedicineData[] => {
  return prescriptionMedicine.map((med: IMedicinePresciption) => {
    // Lấy tất cả thời gian từ dosageSchedules
    const time = [...new Set(
      med.dosageSchedules.map((schedule: IDosageSchedules) => schedule.time)
    )];

    return time.map((t) => {
      const takenDates = med.dosageSchedules
        .filter(
          (schedule: IDosageSchedules) => schedule.time === t && schedule.is_taken
        )
        .map((schedule: IDosageSchedules) => schedule.date);
    
      return {
        id: String(med.id),
        name: med.medicine.name,
        startDate: med.start_time,
        endDate: med.end_time,
        time: t,
        dosage: med.dose_quantity + " " + med.medicine.form,
        note: med.note,
        takenDates,
      };
    });
  }).flat(); // Dùng flat để làm phẳng mảng 2 chiều thành 1 chiều
};


export type prescriptionData = {
  prescriptionCode: number | null;
  medicine: IMedicineData[];
}

export type IMedicineData = {
  id: string,
  name: string,
  startDate: string,
  endDate: string, // 3 ngày
  time: string,
  dosage: string,
  note: string,
  takenDates: string[],
}

export const prescription = createSlice({
  name: 'prescription_data',
  initialState: {
    prescriptionCode: null,
    medicine: [],
  } as prescriptionData,
  reducers: {
    doneMedicine: (state, action) => {
      state.prescriptionCode = state.prescriptionCode;
      state.medicine = state.medicine.map((item) => {
        if (item.id === action.payload.id && item.time === action.payload.time) {
            const taken = item.takenDates.includes(action.payload.date);
            return {
                ...item,
                takenDates: taken
                    ? item.takenDates.filter((d) => d !== action.payload.date)
                    : [...item.takenDates, action.payload.date],
            };
        }
        return item;
    })
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      prescriptionApi.endpoints.getPrescription.matchFulfilled,
      (state, { payload }) => {
        state.prescriptionCode = payload.data.id;
        state.medicine = mapToMedicineData(payload.data.prescriptionMedicine);
      },
    );

  }
})

// Action creators are generated for each case reducer function
export const { doneMedicine } = prescription.actions;

export default prescription.reducer;
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useLazyGetListMedicineQuery } from '../../redux/api/medicine';
import { IMedicine, IMedicinePrescription } from '../../type/api';

export default function AddMedicine({
  prescriptions,
  setPrescriptions,
}: {
  prescriptions: IMedicinePrescription[];
  setPrescriptions: (value: IMedicinePrescription[]) => void;
}) {
  const [medicine, setMedicine] = useState<IMedicine>();
  const [medicineName, setMedicineName] = useState('');
  const [trigger, { data: medicineList }] = useLazyGetListMedicineQuery();
  const [amount, setAmount] = useState('');
  const [timesPerDay, setTimesPerDay] = useState('');
  const [doseQuantity, setDoseQuantity] = useState('');
  const [note, setNote] = useState('');

  const resetMedicineForm = () => {
    setMedicine(undefined);
    setMedicineName('');
    setAmount('');
    setTimesPerDay('');
    setDoseQuantity('');
  };

  useEffect(() => {
    trigger({ search: medicineName });
  }, [medicineName]);

  const addMedicine = () => {
    if (!medicine || !amount || !timesPerDay) {
      alert('Vui lòng nhập đầy đủ thông tin thuốc.');
      return;
    }
    const newMed: IMedicinePrescription = {
      id: Date.now().toString(),
      medicine,
      amount,
      timesPerDay,
      dose_quantity: doseQuantity,
      note,
    };
    setPrescriptions([...prescriptions, newMed]);
    resetMedicineForm();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-left">Thêm thuốc</h3>

      <div className="space-y-3">
        <Select
        key={medicine?.id ?? 'new'} 
          options={medicineList?.data}
          value={medicine || null}
          onChange={(selectedOption) => {
            if (selectedOption) {
              setMedicine(selectedOption);
              setMedicineName('');
            } else {
              setMedicine(undefined);
              setMedicineName('');
            }
          }}
          onInputChange={(value) => setMedicineName(value)}
          getOptionLabel={(option) => option.name + " - " + option.code}
          placeholder="Chọn hoặc nhập tên thuốc"
          isClearable
          isSearchable
          className="text-black"
        />

        <input
          type="number"
          placeholder="Số lượng"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Lần/ngày"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={doseQuantity}
          onChange={(e) => setDoseQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Liều lượng/lần"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={timesPerDay}
          onChange={(e) => setTimesPerDay(e.target.value)}
        />
        <input
          placeholder="Ghi chú"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={timesPerDay}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="text-center pt-2">
        <button
          onClick={addMedicine}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Thêm thuốc
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useAddWorkMutation,  useLazyGetListDoctorQuery } from '../../redux/api/hospital';
import { ENOTIFICATIONTYPE, ESPECIALTIES } from '../../type/enum';
import { useAppDispatch } from '../../redux/hook/hook';
import { openNotification } from '../../redux/slide/notification';

const AddDoctorRoom = ({
  room_id,
  specialties,
  setReload,
}: {
  room_id: number,
  specialties: ESPECIALTIES,
  setReload: (value: boolean) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [doctor, setDoctor] = useState<string>();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isRange, setIsRange] = useState(false);
  const [addWork] = useAddWorkMutation();
  const [triggerGetDoctors, { data }] = useLazyGetListDoctorQuery();
  const dispatch = useAppDispatch();


  const chooseAddWork = async () => {
    setModalVisible(true);
    await triggerGetDoctors({specialties}).unwrap();
  };

  let body;

  const buttonAdd = () => {
    if (!isRange) {
      body = {
        is_range: isRange,
        time: startDate,
      }
    } else {
      body = {
        is_range: isRange,
        start_at: startDate,
        end_at: endDate,
      }
    }
    addWork({ doctor_id: Number(doctor), room_id: room_id, body })
      .unwrap()
      .then(e => {
        dispatch(openNotification({ type: ENOTIFICATIONTYPE.SUCCESS, message: e.message }));
        setModalVisible(false);
        setReload(true);
      })
      .catch(e => {
        dispatch(openNotification({ type: ENOTIFICATIONTYPE.ERROR, message: e.data.message }));
        setModalVisible(false);
      })
  };

  return (
    <div className="flex justify-center items-center w-1/2 bg-gray-100 relative">
      {/* Nút "Thêm lịch trực" */}
      <button
        onClick={() => chooseAddWork()}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition flex-1 cursor-pointer"
      >
        Thêm bác sĩ
      </button>

      {/* Hiệu ứng màn hình trong suốt khi modal hiển thị */}
      {modalVisible && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md z-10">
          {/* Modal */}
          <div className="fixed inset-0 flex justify-center items-center z-20">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Thêm lịch làm việc</h2>

              {/* Phòng làm việc */}
              <div className="mb-4">
                <select className="w-full p-2 border border-gray-300 rounded-md mt-2" value={doctor} onChange={(e) => setDoctor(e.target.value)}>
                  <option value="">Bác sĩ</option>
                  {data?.data.map((e) => (
                    <option key={e.id} value={e.id}>{e.email} </option>
                  ))}
                </select>
              </div>

              {/* Thời gian làm việc */}
              <div className="mb-4">
                <label className="block text-gray-700">Thời gian làm việc:</label>
                <div className="flex space-x-4 mt-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => setIsRange(true)}
                  >
                    Chọn khoảng thời gian
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => setIsRange(false)}
                  >
                    Chọn 1 ngày
                  </button>
                </div>
              </div>

              {/* Chọn khoảng thời gian */}
              {isRange ? (
                <div className="mb-4">
                  <div>
                    <label className="block text-gray-700">Ngày bắt đầu:</label>
                    <input
                      type="date"
                      value={startDate.toISOString().split('T')[0]}
                      onChange={(e) => setStartDate(new Date(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Ngày kết thúc:</label>
                    <input
                      type="date"
                      value={endDate.toISOString().split('T')[0]}
                      onChange={(e) => setEndDate(new Date(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md mt-2"
                    />
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <div>
                    <label className="block text-gray-700">Chọn ngày làm việc:</label>
                    <input
                      type="date"
                      value={startDate.toISOString().split('T')[0]}
                      onChange={(e) => setStartDate(new Date(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-md mt-2"
                    />
                  </div>
                </div>
              )}

              {/* Nút Lưu và Đóng */}
              <div className="flex space-x-4">
                <button
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={buttonAdd}
                >
                  Thêm
                </button>
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => setModalVisible(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDoctorRoom;

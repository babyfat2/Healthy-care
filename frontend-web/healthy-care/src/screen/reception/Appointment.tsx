import { useEffect } from "react";
import { useChangeStatusAppointmentMutation, useLazyGetAppointmentQuery } from "../../redux/api/appointment";
import { ENOTIFICATIONTYPE, ESTATUSAPOINTMENT } from "../../type/enum";
import { useAppDispatch } from "../../redux/hook/hook";
import { openNotification } from "../../redux/slide/notification";

const AppointmentList = () => {
  const [trigger, { data }] = useLazyGetAppointmentQuery();
  const [changeAppointment] = useChangeStatusAppointmentMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    trigger({status: ESTATUSAPOINTMENT.PENDING});
  }, [])
  const handleChangeAppointment = (id: number, status: ESTATUSAPOINTMENT) => {
    changeAppointment({
      appointment_id: id,
      status: status,
    })
    .unwrap()
    .then(e => {
      dispatch(openNotification({type: ENOTIFICATIONTYPE.SUCCESS, message: e.message}));
      trigger({});
    })
    .catch(e => {
      dispatch(openNotification({type: ENOTIFICATIONTYPE.ERROR, message: e.data.message}))
    })
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Danh sách cuộc hẹn</h1>
  
      {data?.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-25 bg-white rounded-xl shadow-md border border-gray-200">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No data"
            className="w-32 h-32 mb-6 opacity-70"
          />
          <p className="text-gray-600 text-lg">Hiện tại chưa có lịch hẹn nào.</p>
          <p className="text-gray-400 text-sm mt-1">Vui lòng quay lại sau hoặc kiểm tra lại sau.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data?.data.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-4 border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="mb-2">
                <span className="text-sm text-gray-500 block">STT: {index + 1}</span>
                <span className="text-sm text-gray-500 block">
                  <span className="font-medium text-gray-600">Ngày khám:</span>{" "}
                  {new Date(item.appointment_time).toLocaleDateString("vi-VN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
  
              <div className="mb-1">
                <span className="font-semibold text-gray-700">Tên người bệnh:</span> {item.name}
              </div>
              <div className="mb-1">
                <span className="font-semibold text-gray-700">Số điện thoại:</span> {item.phone}
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700">Triệu chứng:</span>
                <p className="mt-1 text-gray-800 whitespace-pre-line text-justify">
                  {item.description}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleChangeAppointment(item.id, ESTATUSAPOINTMENT.CONFIRMED)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer"
                >
                  Xác nhận
                </button>
                <button
                  onClick={() => handleChangeAppointment(item.id, ESTATUSAPOINTMENT.REJECTED)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
                >
                  Từ chối
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );  
};

export default AppointmentList;
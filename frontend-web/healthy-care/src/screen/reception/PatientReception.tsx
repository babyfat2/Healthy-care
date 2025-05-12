import { useEffect, useState } from "react";
import socket from "../../socket";
import { useLazyGetAppointmentQuery } from "../../redux/api/appointment";
import { ESTATUSAPOINTMENT } from "../../type/enum";
import { useNavigate } from "react-router-dom";


export default function PatientList() {
  const [activeTab, setActiveTab] = useState<ESTATUSAPOINTMENT>(ESTATUSAPOINTMENT.CONFIRMED);
  const [trigger, { data }] = useLazyGetAppointmentQuery();
  const time = new Date();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("in_progress_appointment", () => {
      console.log("Connected socket");
    });

    return () => {
      socket.off("in_progress_appointment");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    trigger({ status: activeTab, time: time.toISOString() })
  }, [activeTab])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Danh sách lịch hẹn bệnh nhân
      </h1>

      {/* Tabs */}
      <div className="flex space-x-3 mb-6">
        <button
          onClick={() => setActiveTab(ESTATUSAPOINTMENT.CONFIRMED)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === ESTATUSAPOINTMENT.CONFIRMED
            ? "bg-green-600 text-white shadow"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          Bệnh nhân chờ khám
        </button>
        <button
          onClick={() => setActiveTab(ESTATUSAPOINTMENT.IN_PROGRESS)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === ESTATUSAPOINTMENT.IN_PROGRESS
            ? "bg-blue-600 text-white shadow"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          Bệnh nhân đang xử lý
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 bg-gray-100 px-4 py-3 font-semibold text-gray-700 text-sm">
          <div>STT</div>
          <div>Tên bệnh nhân</div>
          <div>Số điện thoại</div>
        </div>

        {data?.data.length ? (
          data?.data.map((patient) => (
            <div
              key={patient.id}
              onClick={() => navigate(`/uploadProfilePateint/${patient.id}`)}
              className="grid grid-cols-3 items-center px-4 py-3 border-t hover:bg-gray-50 text-sm cursor-pointer"
            >
              <div>{patient.stt}</div>
              <div>{patient.name}</div>
              <div>{patient.phone}</div>
            </div>
          ))
        ) : (
          <div className="px-4 py-5 text-gray-500 text-sm space-y-4 text-center">
            <p>Không có bệnh nhân nào trong danh sách này.</p>

            {activeTab === ESTATUSAPOINTMENT.CONFIRMED && (
              <button
                onClick={() => navigate("/uploadProfilePateint/")}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-xl shadow hover:bg-blue-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 cursor-pointer"
              >
                 Thêm mới bệnh nhân
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

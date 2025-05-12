import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Phone, Mail, User } from "lucide-react";
import { useGetDetailDoctorQuery, useLazyGetWorkCalenderDoctorQuery } from "../../redux/api/hospital";
import { EROLE } from "../../type/enum";
import AddWork from "../../component/add/AddWork";
import CalenderDoctorTable from "../../component/calender/CalenderDoctorTable";

const DoctorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [time, setTime] = useState<string>();
  const [reload, setReload] = useState<boolean>(false);

  const doctorId = Number(id);
  const doctor = useGetDetailDoctorQuery({ id: doctorId }).data?.data;
  const [fetchWorkCalender, { data }] = useLazyGetWorkCalenderDoctorQuery();

  useEffect(() => {
    fetchWorkCalender({ id: doctorId });
  }, [])

  useEffect(() => {
    if (time) {
      fetchWorkCalender({ id: doctorId, time });
    } else {
      fetchWorkCalender({ id: doctorId });
    }
    setReload(false);
  }, [time, reload])

  const handleEndJob = () => {
    // Action for ending the job
    alert("Yêu cầu kết thúc công việc đã được gửi.");
  };

  if (!doctor) {
    return <div>Đang tải dữ liệu...</div>; // Hiển thị loading khi chưa có dữ liệu
  }

  return (
    <div className="flex flex-col xl:flex-row gap-10 flex-grow overflow-auto h-[100%] p-5">

      {/* Thẻ div chứa thông tin bác sĩ */}
      <div className="flex-2/5 bg-white p-8 rounded-xl shadow-lg h-160 flex flex-col">
        <div className="flex flex-col items-center">
          {doctor.avatar ? (
            <img
              src={doctor.avatar}
              alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-gray-200 shadow-md"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center shadow-md">
              <User size={50} className="text-gray-600" />
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-800 mt-4">{doctor.full_name}</h2>
          <p className="text-gray-500 text-lg">{doctor.role}</p>

          {doctor.role !== EROLE.RECEPTION && (
            <p className="text-gray-600 mt-2">
              <strong>Chuyên ngành:</strong> {doctor.specialty}
            </p>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail size={20} className="text-blue-500" />
            <span>{doctor.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone size={20} className="text-green-500" />
            <span>{doctor.phone || "Chưa cập nhật"}</span>
          </div>
        </div>

        {doctor.role !== EROLE.RECEPTION && (
          <div className="mt-6">
            <p className="text-gray-700">
              <strong>Kinh nghiệm:</strong> {doctor.experience_year} năm
            </p>
            <p className="text-gray-700">
              <strong>Số giấy phép:</strong> {doctor.license_number}
            </p>
          </div>
        )}

        {/* New Buttons Section */}
        <div className="mt-auto flex justify-between gap-4">
          <button
            onClick={handleEndJob}
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition flex-1 cursor-pointer"
          >
            Nghỉ việc
          </button>
          <AddWork
          id = {doctorId}
          specialties={doctor.specialty}
          setReload={setReload}
           />
        </div>
      </div>


      {/* Thẻ div chứa lịch trực */}
      <div className="flex-3/5 bg-white p-8 rounded-xl shadow-lg h-160">
        <CalenderDoctorTable
          data={data?.data}
          setTime={setTime}
          setReload={setReload}
        />
      </div>
    </div>
  );
};

export default DoctorDetail;

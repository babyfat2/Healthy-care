import { MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetDetailRoomQuery, useLazyGetWorkCalenderRoomQuery } from "../../redux/api/hospital";
import AddDoctorRoom from "../../component/add/AddDoctorRoom";
import { useEffect, useState } from "react";
import CalenderRoomTable from "../../component/calender/CalenderRoomTable";

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const roomId = Number(id);
  const room = useGetDetailRoomQuery({ id: roomId }).data?.data;
  const [time, setTime] = useState<string>();
  const [fetchWorkCalender, { data }] = useLazyGetWorkCalenderRoomQuery();
  const [reload,setReload] = useState<boolean>(false);
  
    useEffect(() => {
      fetchWorkCalender({ id: roomId });
    }, [])
  
    useEffect(() => {
      if (time) {
        console.log(time);
        fetchWorkCalender({ id: roomId, time });
      } else {
        fetchWorkCalender({ id: roomId });
      }
      setReload(false);
    }, [time, reload])

  if (!room) {
    return <div>Đang tải dữ liệu phòng...</div>;
  }

  return (
    <div className="flex flex-col xl:flex-row gap-10 flex-grow overflow-auto h-[100%] p-5">
      
      {/* Thông tin phòng */}
      <div className="flex-2/5 bg-white p-8 rounded-xl shadow-lg h-160 flex flex-col">
        <div className="flex flex-col items-center">
          {/* Hình ảnh phòng */}
            <img
              src="../src/image/clinic.jpg"
              alt="Room"
              className="w-48 h-48 object-cover rounded-xl border-4 border-gray-200 shadow-md"
            />

          <h2 className="text-2xl font-bold text-gray-800 mt-4">Phòng {room.room_number}</h2>
          <p className="text-gray-500 text-lg">{room.room_type}</p>
        </div>

        <div className="mt-6 space-y-3 text-gray-700">
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-blue-500" />
            <span><strong>Tòa nhà:</strong> {room.name_building}</span>
          </div>
          <div>
            <strong>Chuyên khoa:</strong> {room.specialties}
          </div>
          <div>
            <strong>ID bệnh viện:</strong> {room.hospital_id}
          </div>
        </div>

        {/* Các nút thao tác thêm nếu cần */}
        <div className="mt-auto flex justify-end gap-4">
          <button
            onClick={() => alert("Chỉnh sửa phòng")}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition cursor-pointer"
          >
            Thay đổi phòng khám
          </button>
          <AddDoctorRoom
          room_id = {roomId}
          specialties={room.specialties}
          setReload={setReload}
           />
        </div>
      </div>

      {/* Lịch trực */}
      <div className="flex-3/5 bg-white p-8 rounded-xl shadow-lg h-160">
      <CalenderRoomTable
          data={data?.data}
          setTime={setTime}
          setReload={setReload}
        />
      </div>
    </div>
  );
};


export default RoomDetail;

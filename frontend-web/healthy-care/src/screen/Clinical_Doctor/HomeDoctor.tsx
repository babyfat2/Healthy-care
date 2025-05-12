import { Building2 } from "lucide-react";
import { useAppSelector } from "../../redux/hook/hook";
import { useGetMyWorkQuery } from "../../redux/api/doctor";
import { EROOM } from "../../type/enum";

const HomeDoctor = () => {

  const ful_name = useAppSelector(state => state.user.full_name);
  const room = useGetMyWorkQuery(null).data?.data;

  return (
    <div className="h-full p-20">
      <div className="max-w-3xl mx-auto">
        {/* Lời chào */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          👋 Xin chào, {ful_name}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Chúc bạn một ngày làm việc thật hiệu quả và vui vẻ 🌿
        </p>

        {/* Thông tin phòng */}
        {
          room &&
          <div className="bg-blue-100 p-4 rounded-2xl shadow mb-4">
            <div className="flex items-center mb-2">
              <Building2 className="text-blue-600" size={20} />
              <span className="ml-2 text-blue-800 font-semibold">
                Phòng làm việc
              </span>
            </div>
            <p className="text-blue-900 text-sm">
              <span className="font-medium">Phòng:</span> {room.room_number} - {room.name_building}
            </p>
            <p className="text-blue-900 text-sm">
              <span className="font-medium">Loại phòng:</span> {room.room_type}
            </p>
            {room.room_type != EROOM.RECEPTION &&
              <p className="text-blue-900 text-sm">
                <span className="font-medium">Chuyên khoa:</span> {room.specialties}
              </p>
            }
          </div>
        }

      </div>
    </div>
  );
};

export default HomeDoctor;

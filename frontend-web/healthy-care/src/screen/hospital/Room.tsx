import { useEffect, useState } from "react";
import { useLazyGetListRoomQuery } from "../../redux/api/hospital";
import { EROOM, ESPECIALTIES } from "../../type/enum";
import Paginate from "../../component/paginate/Paginate";
import CreateRoom from "../../component/add/CreateRoom";
import { useNavigate } from "react-router-dom";

export default function Room() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [page, choosePage] = useState<number>(1);
  const [trigger, { data }] = useLazyGetListRoomQuery();

  useEffect(() => {
    let dataQuery = {};
    if (search) {
      Object.assign(dataQuery, { "search" : search });
    };
    if (roomType) {
      Object.assign(dataQuery, { "type" : roomType });
    };
    if (specialty) {
      Object.assign(dataQuery, { "specialties" : specialty });
    }
    Object.assign(dataQuery, { "page": page });
    trigger(dataQuery); // Gọi API
  }, [ search, specialty, roomType])

  const handleGoToRoomDetail = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };
  return (
    <div className="p-6 min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">Danh sách Phòng khám</h1>
      
      <div className="mb-3 grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm số phòng..."
          className="p-3 border border-gray-300 rounded-lg w-full shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="p-3 border border-gray-300 rounded-lg shadow-sm" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
          <option value="">Tất cả loại phòng</option>
          {Object.entries(EROOM).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
        <select className="p-3 border border-gray-300 rounded-lg shadow-sm" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
          <option value="">Tất cả chuyên khoa</option>
          {Object.entries(ESPECIALTIES).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
      </div>
      <CreateRoom />

      <div className="overflow-x-auto flex-grow">

          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-800 text-white text-left">
                <th className="p-4">STT</th>
                <th className="p-4">Tòa nhà</th>
                <th className="p-4">Số phòng</th>
                <th className="p-4">Loại phòng</th>
                <th className="p-4">Chuyên khoa</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((room, index) => (
                <tr 
                onClick={() => handleGoToRoomDetail(room.id)}
                key={room.id} 
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 transition-all cursor-pointer`}>
                  <td className="p-4 text-center">{index + 1}</td>
                  <td className="p-4">{room.name_building}</td>
                  <td className="p-4">{room.room_number}</td>
                  <td className="p-4">{room.room_type}</td>
                  <td className="p-4">{room.specialties || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      <div className="flex justify-center mt-6">
              <Paginate
                page={page}
                choosePage={choosePage}
                row={data?.pagination?.row ? data?.pagination?.row : 10}
                total={data?.pagination?.total ? data?.pagination?.total : 0}
              />
            </div>
    </div>
  );
}
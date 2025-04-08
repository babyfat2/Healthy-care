import { useState } from "react";
import { X } from "lucide-react";
import { ECLINICAL, ENOTIFICATIONTYPE, EPARACLINICAL, EROOM } from "../../type/enum";
import { useCreateRoomMutation } from "../../redux/api/hospital";
import { useAppDispatch } from "../../redux/hook/hook";
import { openNotification } from "../../redux/slide/notification";
import { message } from "antd";

const CreateRoom = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [building, setBuilding] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [roomType, setRoomType] = useState<string>();
    const [specialty, setSpecialty] = useState<string>();
    const [createRoom] = useCreateRoomMutation();
    const dispatch = useAppDispatch();

    const handleInvite = () => {
        let valueSpecialty = null;
        if (roomType != EROOM.RECEPTION) {
            valueSpecialty = specialty;
        }
        if (roomType)
            createRoom({
                name_building: building,
                room_number: roomNumber,
                room_type: roomType,
                specialties: valueSpecialty ? valueSpecialty : null,
            })
            .unwrap()
            .then(e => {
                dispatch(openNotification({type: ENOTIFICATIONTYPE.SUCCESS, message: e.message}))
            })
            .catch(e => {
                dispatch(openNotification({type: ENOTIFICATIONTYPE.ERROR, message: e.data.message}))
            })
            setIsOpen(false);
    };

    return (
        <div className="flex justify-end mb-3">
            {/* Nút mở modal */}
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
            >
                Tạo phòng khám
            </button>

            {/* Modal nhập thông tin phòng khám */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Nhập thông tin phòng khám</h2>
                            <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-red-500">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Nhập tên tòa nhà */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tên tòa nhà</label>
                            <input
                                type="text"
                                placeholder="Nhập tên tòa nhà..."
                                value={building}
                                onChange={(e) => setBuilding(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Nhập số phòng */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Số phòng</label>
                            <input
                                type="text"
                                placeholder="Nhập số phòng..."
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Chọn loại phòng */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Loại phòng</label>
                            <select
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Chọn loại phòng</option>
                                {Object.entries(EROOM).map(([key, value]) => (
                                    <option key={key} value={value}>{value}</option>
                                ))}
                            </select>
                        </div>

                        {/* Chọn chuyên khoa */}
                        {
                            roomType === EROOM.CLINICAL && (

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên khoa</label>
                                    <select
                                        value={specialty}
                                        onChange={(e) => setSpecialty(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Chọn chuyên khoa</option>
                                        {Object.entries(ECLINICAL).map(([key, value]) => (
                                            <option key={key} value={value}>{value}</option>
                                        ))}
                                    </select>
                                </div>

                            )}

                        {
                            roomType === EROOM.PARACLINICAL && (

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên khoa</label>
                                    <select
                                        value={specialty}
                                        onChange={(e) => setSpecialty(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Chọn chuyên khoa</option>
                                        {Object.entries(EPARACLINICAL).map(([key, value]) => (
                                            <option key={key} value={value}>{value}</option>
                                        ))}
                                    </select>
                                </div>

                            )}

                        {/* Nút xác nhận */}
                        <button
                            onClick={handleInvite}
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateRoom;

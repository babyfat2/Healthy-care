import { Calendar, Trash2 } from "lucide-react";
import { IWorkDoctor } from "../../type/api";
import { useEffect, useState } from "react";
import { useLazyDeleteWorkQuery } from "../../redux/api/hospital";
import { useAppDispatch } from "../../redux/hook/hook";
import { openNotification } from "../../redux/slide/notification";
import { ENOTIFICATIONTYPE } from "../../type/enum";

const CalenderDoctorTable = ({
    data,
    setTime,
    setReload,
}: {
    data: IWorkDoctor[] | undefined;
    setTime: (value: string ) => void;
    setReload: (value: boolean ) => void;
}) => {
    // State để lưu tháng và năm được chọn
    const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7));
    const [deleteWork] = useLazyDeleteWorkQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const formattedMonth = selectedMonth.split("-").reverse().join("-");
        setTime(formattedMonth);
    }, [selectedMonth])

    const workDelete = (work_id: number) => {
        deleteWork({ id: work_id })
        .unwrap()
        .then((e) => {
            setReload(true);
            dispatch(openNotification({type: ENOTIFICATIONTYPE.SUCCESS, message: e.message}))
        })
        .catch(e => {
            dispatch(openNotification({type: ENOTIFICATIONTYPE.ERROR, message: e.data.message}))
        })
    };


    // Hàm định dạng ngày hiển thị
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="w-full h-full bg-white p-4 flex flex-col">
            {/* Tiêu đề "Lịch trực" */}
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <Calendar size={22} /> Lịch trực
            </h3>

            {/* Bộ lọc tháng */}
            <div className="flex flex-wrap gap-4 items-center mb-4">
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-2 border rounded-lg"
                />
            </div>

            {/* Danh sách lịch trực */}
            <div className="bg-gray-100 p-4 rounded-lg flex-1 overflow-y-auto">
                {data?.length === 0 ? (
                    <p className="text-gray-500 text-center">Không có lịch trực nào trong tháng này</p>
                ) : (
                    <>
                        {/* Tiêu đề cột */}
                        <div className="flex font-semibold text-gray-700 p-2 border-b border-gray-300 mb-2">
                            <span className="w-1/4">Ngày làm việc</span>
                            <span className="w-1/4 text-center">Phòng làm việc</span>
                            <span className="w-1/4 text-center">Tòa nhà</span>
                        </div>

                        {/* Danh sách ca trực */}
                        <ul className="space-y-2">
                            {data?.map((shift) => (
                                <li
                                    key={shift.id}
                                    className="p-3 bg-white rounded-lg shadow-md flex items-center"
                                >
                                    <span className="w-1/4 font-medium">{formatDate(shift.work_time)}</span>
                                    <span className="w-1/4 text-center text-gray-600">{shift.room_number}</span>
                                    <span className="w-1/4 text-center text-gray-600">{shift.name_building || "N/A"}</span>
                                    <div className="w-1/4 flex justify-end gap-2">
                                        <button
                                            className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 transition cursor-pointer"
                                            onClick={() => workDelete(Number(shift.id))}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default CalenderDoctorTable;

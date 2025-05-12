import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetDetailAppointmentQuery } from "../../redux/api/appointment";
import { IPatient } from "../../type/api";
import { InputProfile } from "../../component/UploadProfile/InputProfile";
import { normalizePatient } from "../../component/UploadProfile/NomalizePatient";
import { ECLINICAL, ENOTIFICATIONTYPE, ESPECIALTIES } from "../../type/enum";
import { useLazyGetListRoomQuery } from "../../redux/api/hospital";
import { useConfirmProfileMutation } from "../../redux/api/reception";
import { useAppDispatch } from "../../redux/hook/hook";
import { openNotification } from "../../redux/slide/notification";
import { message } from "antd";

export default function UploadProfilePatient() {
  const { id } = useParams<{ id: string }>();
  const appointment_id = Number(id);
  const { data } = useGetDetailAppointmentQuery({ id: appointment_id }, { skip: !appointment_id });
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useAppDispatch();

  const [patient, setPatient] = useState<IPatient>({
    id: 1,
    citizen_identification_id: "",
    full_name: "",
    address: "",
    hometown: "",
    birthday: "",
    ethnicity: "",
    issued_date: "",
    issued_place: "",
    phone: "",
  });
  const [description, setDescription] = useState<string>("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<ESPECIALTIES>();
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [triggerGetRooms, room] = useLazyGetListRoomQuery();
  const [UploadProfile] = useConfirmProfileMutation();

  // Đổ dữ liệu khi có data
  useEffect(() => {
    if (data?.data?.patient) {
      setPatient(normalizePatient(data.data.patient));
    }
    if (data?.data?.appointment) {
      setDescription(data.data.appointment.description);
    }
  }, [data]);

  useEffect(() => {
    triggerGetRooms({ specialties: selectedSpecialty }).unwrap();
  }, [selectedSpecialty]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialtyChange = (e: any) => {
    const { value } = e.target;
    setSelectedSpecialty(value);
    setSelectedRoom(""); // Reset room when changing specialty
  };

  const handleSubmit = () => {
    setSubmitted(true);
    UploadProfile({
      patient,
      room_id: selectedRoom,
      appointment_description: description
    })
    .unwrap()
    .then(e => {
      dispatch(openNotification({type: ENOTIFICATIONTYPE.SUCCESS, message: e.data.message}))
    })
    .catch((e) => {
      console.log(e);
      dispatch(openNotification({type: ENOTIFICATIONTYPE.ERROR, message: e}))
    })
  };

  return (
    <div className="w-full bg-gray-100 p-6">
      <div className="w-full bg-white rounded-xl shadow-md p-10">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
          Nhập Thông Tin Người Bệnh
        </h1>

        <form className="space-y-12">
          {/* CCCD */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Thông tin căn cước</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputProfile name="full_name" label="Họ và tên" value={patient.full_name} onChange={handleChange} showError={submitted} />
              <InputProfile name="citizen_identification_id" label="Số CCCD" value={patient.citizen_identification_id} onChange={handleChange} showError={submitted} />
              <InputProfile name="birthday" label="Ngày sinh" type="date" value={patient.birthday} onChange={handleChange} showError={submitted} />
              <InputProfile name="ethnicity" label="Dân tộc" value={patient.ethnicity} onChange={handleChange} showError={submitted} />
              <InputProfile name="address" label="Địa chỉ thường trú" value={patient.address} onChange={handleChange} showError={submitted} />
              <InputProfile name="hometown" label="Quê quán" value={patient.hometown} onChange={handleChange} showError={submitted} />
              <InputProfile name="issued_date" label="Ngày cấp CCCD" type="date" value={patient.issued_date} onChange={handleChange} showError={submitted} />
              <InputProfile name="issued_place" label="Nơi cấp" value={patient.issued_place} onChange={handleChange} showError={submitted} />
              <InputProfile name="phone" label="Số điện thoại" value={patient.phone} onChange={handleChange} showError={submitted} />
            </div>
          </section>

          {/* Khám bệnh */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Thông tin khám bệnh</h2>
            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">Triệu chứng bệnh</label>
              <textarea
                name="symptoms"
                rows={3}
                className="w-full border rounded-lg px-4 py-2 resize-none"
                placeholder="Ví dụ: đau đầu, ho, chóng mặt..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Chuyên khoa */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">Chuyên khoa</label>
                <select
                  name="specialty"
                  value={selectedSpecialty}
                  onChange={handleSpecialtyChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">-- Chọn chuyên khoa --</option>
                  {Object.entries(ECLINICAL).map(([key, value]) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phòng khám */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">Phòng khám</label>
                <select
                  name="room"
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                  disabled={!selectedSpecialty}
                >
                  <option value="">-- Chọn phòng khám --</option>
                  {room.data?.data.map((e) => (
                    <option key={e.id} value={e.id}>{e.room_number} - {e.name_building} </option>
                  ))}
                </select>
                {!selectedSpecialty && (
                  <p className="text-red-500 text-sm mt-2">Vui lòng chọn chuyên khoa trước.</p>
                )}
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              💾 Xác nhận thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

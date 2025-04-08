import { useState } from "react";
import { X } from "lucide-react";
import { useInviteDoctorMutation } from "../../redux/api/hospital";
import { openNotification } from "../../redux/slide/notification";
import { useAppDispatch } from "../../redux/hook/hook";
import { ENOTIFICATIONTYPE } from "../../type/enum";

const InviteDoctor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<string>();
  const [startAt, setStartAt] = useState<string>();
  const [inviteDoctor] = useInviteDoctorMutation();
  const dispatch = useAppDispatch();

  const handleInvite = () => {
    if (email && startAt) {
    let start_at = new Date(startAt);
    inviteDoctor({email, start_at})
    .unwrap()
    .then(e => {
      dispatch(openNotification({ type: ENOTIFICATIONTYPE.SUCCESS, message: e.message}));
    })
    .catch(error =>{
      dispatch(openNotification({ type: ENOTIFICATIONTYPE.ERROR, message: error.data.message}));
    })

    }
    setIsOpen(false);
    setEmail(undefined);
    setStartAt(undefined);
  };

  return (
    <div className="flex justify-end mb-3">
      {/* Nút mở modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
      >
        Mời Bác Sĩ
      </button>

      {/* Modal nhập email và start_at */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Nhập Thông Tin Bác Sĩ</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-red-500">
                <X size={20} />
              </button>
            </div>

            {/* Trường nhập Email */}
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email Bác Sĩ
            </label>
            <input
              type="email"
              placeholder="Nhập email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Trường nhập ngày start_at */}
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Ngày bắt đầu làm việc
            </label>
            <input
              type="date"
              value={startAt}
              onChange={(e) => setStartAt(e.target.value)}
              className="mb-4 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleInvite}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
            >
              Gửi Lời Mời
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteDoctor;

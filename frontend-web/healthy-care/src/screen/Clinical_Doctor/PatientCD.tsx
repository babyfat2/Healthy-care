const patients = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    time: "08:30",
    reason: "Khám định kỳ",
    status: "Chờ",
  },
  {
    id: 2,
    name: "Trần Thị B",
    time: "09:15",
    reason: "Khó thở",
    status: "Đang khám",
  },
  {
    id: 3,
    name: "Lê Văn C",
    time: "10:00",
    reason: "Đau đầu",
    status: "Đã khám",
  },
];

const statusColor = {
  "Chờ": "bg-yellow-100 text-yellow-800",
  "Đang khám": "bg-blue-100 text-blue-800",
  "Đã khám": "bg-green-100 text-green-800",
};

const PatientCD = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">👨‍⚕️ Danh sách bệnh nhân hôm nay</h2>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-3">Tên bệnh nhân</th>
                <th className="px-4 py-3">Giờ hẹn</th>
                <th className="px-4 py-3">Lý do khám</th>
                <th className="px-4 py-3">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b last:border-none">
                  <td className="px-4 py-3">{patient.name}</td>
                  <td className="px-4 py-3">{patient.time}</td>
                  <td className="px-4 py-3">{patient.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientCD;

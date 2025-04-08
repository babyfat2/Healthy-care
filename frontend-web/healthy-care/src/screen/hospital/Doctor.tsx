import { useEffect, useState } from "react";
import { useLazyGetListDoctorQuery } from "../../redux/api/hospital";
import { ESPECIALTIES, ESTAFF, ESTATUSWORK } from "../../type/enum";
import Paginate from "../../component/paginate/Paginate";
import InviteDoctor from "../../component/add/InviteDoctor";
import { useNavigate } from "react-router-dom";


export default function Doctor() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string>();
  const [specialty, setSpecialty] = useState("");
  const [status, setStatus] = useState("");
  const [page, choosePage] = useState<number>(1);
  const [trigger, { data }] = useLazyGetListDoctorQuery();


  useEffect(() => {
    let dataQuery = {};
    if (search) {
      Object.assign(dataQuery, { "search": search });
    };
    if (role) {
      Object.assign(dataQuery, { "role": role });
    };
    if (status) {
      Object.assign(dataQuery, { "status": status });
    };
    if (specialty) {
      Object.assign(dataQuery, { "specialties": specialty });
    }
    Object.assign(dataQuery, { "page": page });

    
    trigger(dataQuery); // Gọi API
  }, [role, search, specialty, status, page, trigger])

  const handleGoToDoctorDetail = (doctorId: string) => {
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">Danh sách Bác sĩ</h1>
      <div className="mb-3 grid grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm bác sĩ..."
          className="p-3 border border-gray-300 rounded-lg w-full shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="p-3 border border-gray-300 rounded-lg shadow-sm" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Tất cả vai trò</option>
          {Object.entries(ESTAFF).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
        <select className="p-3 border border-gray-300 rounded-lg shadow-sm" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
          <option value="">Tất cả chuyên khoa</option>
          {Object.entries(ESPECIALTIES).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
        <select className="p-3 border border-gray-300 rounded-lg shadow-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          {Object.entries(ESTATUSWORK).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
      </div>
      <InviteDoctor />
      <div className="overflow-x-auto flex-grow">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-800 text-white text-left">
              <th className="p-4">STT</th>
              <th className="p-4">Tên</th>
              <th className="p-4">Email</th>
              <th className="p-4">Vai trò</th>
              <th className="p-4">Chuyên khoa</th>
              <th className="p-4">Ngày bắt đầu</th>
              <th className="p-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((doctor, index) => (
              <tr
              className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200 transition-all cursor-pointer`} 
              onClick={() => handleGoToDoctorDetail(doctor.id)}
              >
                <td className="p-4 text-center">{index + 1}</td>
                <td className="p-4">{doctor.full_name}</td>
                <td className="p-4">{doctor.email}</td>
                <td className="p-4">{doctor.role}</td>
                <td className="p-4">{doctor.paraclinical_specialties || doctor.clinical_specialties || "-"}</td>
                <td className="p-4">{new Date(doctor.start_at).toLocaleDateString()}</td>
                <td className="p-4">{doctor.status}</td>
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

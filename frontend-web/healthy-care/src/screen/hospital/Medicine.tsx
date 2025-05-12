import { useEffect, useState } from "react";
import { useLazyGetListMedicineQuery } from "../../redux/api/medicine";


export default function Medicine() {
  const [search, setSearch] = useState("");
  const [trigger, { data }] = useLazyGetListMedicineQuery();

  useEffect(() => {
    let dataQuery = {};
    if (search) {
      Object.assign(dataQuery, { "search": search });
    }
    trigger(dataQuery); // Gọi API
  }, [search]);

  return (
    <div className="p-6 min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">Danh sách Thuốc</h1>
      
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Tìm kiếm tên thuốc..."
          className="p-3 border border-gray-300 rounded-lg w-1/2 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto flex-grow">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-800 text-white text-left">
              <th className="p-4">STT</th>
              <th className="p-4">Tên thuốc</th>
              <th className="p-4">Mã thuốc</th>
              <th className="p-4">Xuất xứ</th>
              <th className="p-4">Mô tả</th>
              <th className="p-4">Giá</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((medicine, index) => (
              <tr key={medicine.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 transition-all cursor-pointer`}>
                <td className="p-4 text-center">{index + 1}</td>
                <td className="p-4">{medicine.name}</td>
                <td className="p-4">{medicine.code}</td>
                <td className="p-4">{medicine.origin}</td>
                <td className="p-4">{medicine.description || "-"}</td>
                <td className="p-4">{medicine.price} VND</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
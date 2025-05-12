import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import AddMedicine from '../../component/add/AddMedicine';
import { IMedicinePrescription } from '../../type/api';
import './AddPrescription.css'; // Import CSS
import { useGetInforPrescriptionQuery } from '../../redux/api/doctor';
import { useParams } from 'react-router-dom';


export default function AddPrescription() {
  const { id } = useParams<{ id: string }>();
  const data = useGetInforPrescriptionQuery(
    { id: id || "0" },
    { skip: !id }  // 👈 Chỉ gọi khi đã có id
  );
  const [prescriptions, setPrescriptions] = useState<IMedicinePrescription[]>([]);
  const [diagnosis, setDiagnosis] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false); // 👈 Trạng thái xác nhận

  const handleConfirm = () => {
    if (!diagnosis || prescriptions.length === 0) {
      alert("Vui lòng nhập chuẩn đoán và thêm ít nhất một thuốc.");
      return;
    }
    setIsConfirmed(true);
    alert("Đơn thuốc đã được xác nhận!");
  };

  const generatePDF = async () => {
    // Tạo một div tạm thời để chỉ chứa nội dung cần in
    const printElement = document.createElement('div');
    const element = document.getElementById('prescription-content');
    if (!element) {
      alert('Không tìm thấy nội dung đơn thuốc để xuất PDF.');
      return;
    }

    // Sao chép nội dung từ 'prescription-content' vào div tạm thời
    printElement.innerHTML = element.innerHTML;

    const style = document.createElement('style');
    style.textContent = `
      h1 {
        font-size: 56px !important;
        font-weight: bold;
      }

      h2 {
        font-size: 48px !important;
        font-weight: bold;
      }


      p {
        font-size: 32px !important;
        line-height: 1.6;
      }

      .note {
        font-size: 28px !important;
        color: gray;
        }

      table th {
        font-size: 32px !important;
        font-weight: bold;
      }

      table td {
        font-size: 30px !important;
        
      }

      .doctor-name {
        margin-top: 10rem;
        font-style: italic;
      }
    `;
    printElement.appendChild(style);




    // Xóa các nút Xóa và cột "Hành động" trong div tạm thời
    const deleteButtons = printElement.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => button.remove());

    const actionColumn = printElement.querySelectorAll('.action-column');

    // Ep kiểu phần tử thành HTMLElement để truy cập thuộc tính style
    actionColumn.forEach((column) => {
      (column as HTMLElement).style.display = 'none'; // Ep kiểu thành HTMLElement
    });

    // Đưa div tạm thời vào trong body để rendering
    document.body.appendChild(printElement);

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(printElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#FFFFFF',
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Thêm lề cho file PDF
        const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // Lề 10mm 2 bên
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight); // Căn lề từ 10mm (trái, phải)
        pdf.save(data.data?.data.patient.full_name + 'don-thuoc.pdf');
      } catch (error) {
        console.error('Xuất file lỗi:', error);
        alert('Có lỗi xảy ra khi xuất PDF. Vui lòng kiểm tra lại!');
      } finally {
        // Xóa div tạm thời khỏi DOM sau khi render xong
        document.body.removeChild(printElement);
      }
    }, 100);
  };

  const deleteMedicine = (id: string) => {
    setPrescriptions(prevPrescriptions =>
      prevPrescriptions.filter(med => med.id !== id)
    );
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="form-group">
          <label htmlFor="diagnosis">Chuẩn đoán bệnh:</label>
          <textarea
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            placeholder="Nhập chuẩn đoán bệnh"
            className="diagnosis-input"
            rows={4}
          />
        </div>

        <AddMedicine prescriptions={prescriptions} setPrescriptions={setPrescriptions} />

        <div className="mt-6 flex flex-col gap-4">
          {!isConfirmed && (
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Xác nhận đơn thuốc
            </button>
          )}

          {isConfirmed && (
            <button
              onClick={generatePDF}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Xuất file PDF
            </button>
          )}
        </div>
      </div>
      <div className="right-panel" id="prescription-content">
        <div className="header">
          <h1>{data.data?.data.hospital.name}</h1>
          <p>{data.data?.data.hospital.address}</p>
          <p>Điện thoại: {data.data?.data.hospital.phone}</p>
          <p className="prescription-code">Mã đơn thuốc: {data.data?.data.  prescriptionCode}</p>
        </div>

        <h2 className="prescription-title">ĐƠN THUỐC</h2>

        <div className="patient-info">
          <h2 className="text-xl font-bold">Thông tin bệnh nhân</h2>
          <div className="patient-detail">
            <p><strong>Họ tên:</strong> {data.data?.data.patient.full_name}</p>
            <p><strong>Tuổi:</strong> {data.data?.data.patient.age} - <strong>Giới tính:</strong> {data.data?.data.patient.gender}</p>
            <p><strong>Địa chỉ:</strong> {data.data?.data.patient.address}</p>
            <p><strong>Chuẩn đoán:</strong> {diagnosis}</p>
          </div>
        </div>

        <table className="prescription-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên thuốc</th>
              <th>Liều lượng</th>
              <th>Số lần/ngày</th>
              <th>Liều lượng/lần</th>
              <th className="action-column">Hành động</th> {/* Cột Hành động */}
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((med, index) => (
              <tr key={med.id}>
                <td>{index + 1}</td>
                <td>{med.medicine.name + " - " + med.medicine.code}</td>
                <td>{med.amount + " " + med.medicine.form}</td>
                <td>{med.timesPerDay}</td>
                <td>{med.dose_quantity}</td>
                <td className="action-column">
                  <button
                    className="delete-btn"
                    onClick={() => deleteMedicine(med.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="footer">
          <div className="date">
            <p>Ngày kê đơn: {new Date().toLocaleDateString('vi-VN')}</p>
          </div>
          <div className="signature">
            <p><strong>Bác sĩ ký tên</strong></p>
            <p className="doctor-name">Bs. {data.data?.data.doctor_name}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

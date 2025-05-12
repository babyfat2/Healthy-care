export enum EROLE {
    PATIENT = "Bệnh nhân",
    CLINICAL_DOCTOR = "Bác sĩ lâm sàng",
    PARACLINICAL_DOCTOR = "Bác sĩ cận lâm sàng",
    RECEPTION = "Lễ tân",
    HOSPITAL = "Bệnh viện",
}

export enum ESTAFF {
    CLINICAL_DOCTOR = "Bác sĩ lâm sàng",
    PARACLINICAL_DOCTOR = "Bác sĩ cận lâm sàng",
    RECEPTION = "Lễ tân",
}

export enum EROOM {
    CLINICAL = "Khám lâm sàng",
    PARACLINICAL = "Cận lâm sàng",
    RECEPTION = "Lễ tân",
}

export enum ESPECIALTIES {
    // Chuyên khoa khám bệnh phổ biến
    GENERAL_INTERNAL_MEDICINE = "Nội tổng quát",
    CARDIOLOGY = "Tim mạch",
    RESPIRATORY = "Hô hấp",
    GASTROENTEROLOGY = "Tiêu hóa",
    NEPHROLOGY = "Thận - Tiết niệu",
    ENDOCRINOLOGY = "Nội tiết",
    NEUROLOGY = "Thần kinh",
    ORTHOPEDICS = "Cơ xương khớp",
    HEMATOLOGY = "Huyết học",
    DERMATOLOGY = "Da liễu",
    PEDIATRICS = "Nhi khoa",
    GYNECOLOGY = "Phụ khoa",
    OPHTHALMOLOGY = "Mắt",
    OTOLARYNGOLOGY = "Tai Mũi Họng",
    DENTISTRY = "Răng Hàm Mặt",
    PSYCHIATRY = "Tâm thần",
    ONCOLOGY = "Ung bướu",
    MEDICAL_LABORATORY = "Xét nghiệm y khoa",
    BLOOD_TESTING = "Xét nghiệm huyết học",
    BIOCHEMISTRY = "Xét nghiệm sinh hóa",
    MICROBIOLOGY = "Xét nghiệm vi sinh",
    IMMUNOLOGY = "Xét nghiệm miễn dịch",
    MOLECULAR_BIOLOGY = "Xét nghiệm sinh học phân tử",
    PHLEBOTOMY = "Lấy mẫu máu",
    DIAGNOSTIC_IMAGING = "Chẩn đoán hình ảnh",
    PATHOLOGY = "Giải phẫu bệnh",
}

export enum ECLINICAL {
    // Chuyên khoa khám bệnh phổ biến
    GENERAL_INTERNAL_MEDICINE = "Nội tổng quát",
    CARDIOLOGY = "Tim mạch",
    RESPIRATORY = "Hô hấp",
    GASTROENTEROLOGY = "Tiêu hóa",
    NEPHROLOGY = "Thận - Tiết niệu",
    ENDOCRINOLOGY = "Nội tiết",
    NEUROLOGY = "Thần kinh",
    ORTHOPEDICS = "Cơ xương khớp",
    HEMATOLOGY = "Huyết học",
    DERMATOLOGY = "Da liễu",
    PEDIATRICS = "Nhi khoa",
    GYNECOLOGY = "Phụ khoa",
    OPHTHALMOLOGY = "Mắt",
    OTOLARYNGOLOGY = "Tai Mũi Họng",
    DENTISTRY = "Răng Hàm Mặt",
    PSYCHIATRY = "Tâm thần",
    ONCOLOGY = "Ung bướu",
}

export enum EPARACLINICAL {
    // Chuyên khoa khám bệnh phổ biến
    MEDICAL_LABORATORY = "Xét nghiệm y khoa",
    BLOOD_TESTING = "Xét nghiệm huyết học",
    BIOCHEMISTRY = "Xét nghiệm sinh hóa",
    MICROBIOLOGY = "Xét nghiệm vi sinh",
    IMMUNOLOGY = "Xét nghiệm miễn dịch",
    MOLECULAR_BIOLOGY = "Xét nghiệm sinh học phân tử",
    PHLEBOTOMY = "Lấy mẫu máu",
    DIAGNOSTIC_IMAGING = "Chẩn đoán hình ảnh",
    PATHOLOGY = "Giải phẫu bệnh",
}

export enum ESTATUS {
    PENDING = 'PENDING',
    COMFIRMED = 'COMFIRMED',
    COMPLETED = 'COMPLETED',
    CANCELLED= 'CANCELLED',
}

export enum ESTATUSWORK {
    INVITED = "Đang mời",
    REJECTED = "Từ chối",
    WORKING = "Đang làm",
    RESIGNED = "Nghỉ việc",
}

export enum ENOTIFICATIONTYPE {
    SUCCESS = "success",
    ERROR = "error",
}

export enum ESTATUSAPOINTMENT {
    PENDING = 'Đặt trước', // đặt trước (chưa được xác nhận)
    CONFIRMED = 'Xác nhận', // đã được xác nhận và có lịch khám
    IN_PROGRESS = 'Đang xử lý', // đang nhập thông tin hồ sơ
    IN_CONSULTATION = 'Đang khám', // hoàn thành việc khám bệnh
    MISSED = 'Bỏ khám', // gọi người bệnh không được
    CANCELLED = 'Đã hủy', //do người dùng hủy
    REJECTED = "Từ chối", // do bệnh viện từ chối
    COMPLETED = 'Hoàn thành' // hoàn thành việc khám
}
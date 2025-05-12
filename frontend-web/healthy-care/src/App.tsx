import { Route, Routes } from "react-router-dom";
import Login from "./screen/auth/Login";
import ForgotPassword from "./screen/auth/ForgotPassword ";
import { useAppSelector } from "./redux/hook/hook";
import ChangePassword from "./screen/auth/ChangePassword";
import NotificationComponent from "./component/notification/notification";
import { ToastContainer } from "react-toastify";
import { EROLE } from "./type/enum";
import HospitalNavigation from "./navigation/HospitalNavigation";
import ClinicalDoctorNavigation from "./navigation/ClinicalDoctorNavigation";
import ReceptionNavigation from "./navigation/ReceptionNavigation";


function App() {
  const isLogin = useAppSelector((status) => status.user.isLogin);
  const role = useAppSelector((status) => status.user.role);



  if (isLogin) {
    return (
      <div className="h-screen w-full flex flex-row">
        <NotificationComponent />
        <ToastContainer />
        {
          role === EROLE.HOSPITAL && <HospitalNavigation />
        }
        {
          role === EROLE.CLINICAL_DOCTOR && <ClinicalDoctorNavigation />
        }
        {
          role === EROLE.RECEPTION && <ReceptionNavigation />
        }
      </div>
    )
  }
  else {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password/:token" element={<ChangePassword />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    );
  }
}

export default App;
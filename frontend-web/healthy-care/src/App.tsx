import { Route, Routes } from "react-router-dom";
import Login from "./screen/auth/Login";
import ForgotPassword from "./screen/auth/ForgotPassword ";
import { useAppSelector } from "./redux/hook/hook";
import ChangePassword from "./screen/auth/ChangePassword";
import Sidebar from "./component/SideBar";
import { Home as HomeIcon, Settings, User } from "lucide-react";
import { MenuItem } from "./global/golbalObject";
import Doctor from "./screen/hospital/Doctor";
import Room from "./screen/hospital/Room";
import Medicine from "./screen/hospital/Medicine";
import DoctorDetail from "./screen/hospital/DoctorDetail";
import NotificationComponent from "./component/notification/notification";
import { ToastContainer } from "react-toastify";
import { EROLE } from "./type/enum";
import Header from "./component/Header";
import RoomDetail from "./screen/hospital/RoomDetail";
import HomeDoctor from "./screen/Doctor/HomeDoctor";
import Patient from "./screen/Doctor/Pateint";


function App() {
  const isLogin = useAppSelector((status) => status.user.isLogin);
  const role = useAppSelector((status) => status.user.role);



  if (isLogin) {
  if (role === EROLE.CLINICAL_DOCTOR) {
    const menuItems: MenuItem[] = [
      { name: "Trang chủ", icon: <HomeIcon size={20} />, link: "" },
      { name: "Bệnh nhân", icon: <Settings size={20} />, link: "/pateint" },
      { name: "Setti", icon: <Settings size={20} />, link: "#" },
    ]
    return (
      <div className="h-screen w-full flex flex-row">
        <NotificationComponent />
        <ToastContainer />
        <div className="h-screen w-64 bg-gray-800 text-white hidden lg:block">
          <Sidebar menuItems={menuItems} />
        </div>

        <div className="flex-1 h-screen overflow-y-auto">
          <Header />
          <div className="flex-1 h-auto">
          <Routes>
            <Route path="" element={<HomeDoctor />} />
            <Route path="/pateint" element={<Patient />} />
          </Routes>
          </div>
        </div>
      </div>
    );
  } else {
    const menuItems = [
      { name: "Doctor", icon: <HomeIcon size={20} />, link: "/doctor" },
      { name: "Room", icon: <User size={20} />, link: "/room" },
      { name: "Settings", icon: <Settings size={20} />, link: "/forgot-password" },
      { name: "Medicine", icon: <Settings size={20} />, link: "/medicine" },
    ]
    return (
      <div className="h-screen w-full flex flex-row">
        <NotificationComponent />
        <ToastContainer />
        <div className="h-screen w-64 bg-gray-800 text-white hidden lg:block">
          <Sidebar menuItems={menuItems} />
        </div>

        <div className="flex-1 h-screen overflow-y-auto">
          <Header />
          <div className="flex-1 h-auto">
          <Routes>
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/room" element={<Room />} />
            <Route path="/medicine" element={<Medicine />} />
            <Route path="/doctor/:id" element={<DoctorDetail />} />
            <Route path="/room/:id" element={<RoomDetail />} />
          </Routes>
          </div>
        </div>
      </div>
    )
  }
  } else {
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
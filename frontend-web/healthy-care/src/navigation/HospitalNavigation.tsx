import { Route, Routes, } from "react-router-dom";
import { Home as HomeIcon, Settings, User } from "lucide-react";
import { ToastContainer } from "react-toastify";
import Sidebar from "../component/SideBar";
import Header from "../component/Header";
import Doctor from "../screen/hospital/Doctor";
import Room from "../screen/hospital/Room";
import Medicine from "../screen/hospital/Medicine";
import DoctorDetail from "../screen/hospital/DoctorDetail";
import RoomDetail from "../screen/hospital/RoomDetail";

function HospitalNavigation() {
  const menuItems = [
    { name: "Doctor", icon: <HomeIcon size={20} />, link: "/doctor" },
    { name: "Room", icon: <User size={20} />, link: "/room" },
    { name: "Settings", icon: <Settings size={20} />, link: "/forgot-password" },
    { name: "Medicine", icon: <Settings size={20} />, link: "/medicine" },
  ];
  return (
    <div className="h-screen w-full flex flex-row">
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
  );
}

export default HospitalNavigation;
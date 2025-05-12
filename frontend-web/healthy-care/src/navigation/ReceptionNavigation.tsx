import { Route, Routes, } from "react-router-dom";
import { Home as HomeIcon, Settings } from "lucide-react";
import Header from "../component/Header";
import { MenuItem } from "../global/golbalObject";
import HomeDoctor from "../screen/Clinical_Doctor/HomeDoctor";
import Sidebar from "../component/SideBar";
import Appointment from "../screen/reception/Appointment";
import PatientList from "../screen/reception/PatientReception";
import UploadProfilePateint from "../screen/reception/UploadProfilePateint";


function ReceptionNavigation() {
    const menuItems: MenuItem[] = [
        { name: "Trang chủ", icon: <HomeIcon size={20} />, link: "" },
        { name: "Bệnh nhân", icon: <Settings size={20} />, link: "/patient" },
        { name: 'Lịch hẹn chờ duyệt',  icon: <HomeIcon size={20} />, link: "/appointment"  }
    ]
    return (
        <div className="h-screen w-full flex flex-row">
            <div className="h-screen w-64 bg-gray-800 text-white hidden lg:block">
                <Sidebar menuItems={menuItems} />
            </div>
            <div className="flex-1 h-screen overflow-y-auto">
                <Header />
                <div className="flex-1 h-auto">
                    <Routes>
                        <Route path="" element={<HomeDoctor />} />
                        <Route path="/appointment" element={<Appointment />} />
                        <Route path="/patient" element={<PatientList />} />
                        <Route path="/uploadProfilePateint/:id?" element={<UploadProfilePateint />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default ReceptionNavigation;
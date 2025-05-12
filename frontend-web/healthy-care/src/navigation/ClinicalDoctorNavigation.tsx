import { Route, Routes, } from "react-router-dom";
import { Home as HomeIcon, Settings } from "lucide-react";
import Header from "../component/Header";
import { MenuItem } from "../global/golbalObject";
import HomeDoctor from "../screen/Clinical_Doctor/HomeDoctor";
import Sidebar from "../component/SideBar";
import PatientCD from "../screen/Clinical_Doctor/PatientCD";
import AddPrescription from "../screen/Clinical_Doctor/AddPrescription";


function ClinicalDoctorNavigation() {
    const menuItems: MenuItem[] = [
        { name: "Trang chủ", icon: <HomeIcon size={20} />, link: "" },
        { name: "Bệnh nhân", icon: <Settings size={20} />, link: "/patient" },
        { name: "Setti", icon: <Settings size={20} />, link: "/add_prescription" },
    ]
    return (
        <div className="h-screen w-full flex flex-row">
            <div className="h-screen w-64 bg-gray-800 text-white hidden lg:block">
                <Sidebar menuItems={menuItems} />
            </div>
            <div className="flex-1 h-screen overflow-y-auto">

                    <Routes>
                        <Route path="" element={<HomeDoctor />} />
                        <Route path="/patient" element={<PatientCD />} />
                        <Route path="/add_prescription/:id" element={<AddPrescription />} />
                    </Routes>

            </div>
        </div>
    );
}

export default ClinicalDoctorNavigation;
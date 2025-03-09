import { Route, Routes } from "react-router-dom";
import Login from "./screen/auth/Login";
import ForgotPassword from "./screen/auth/ForgotPassword ";
import { useAppSelector } from "./redux/hook/hook";
import { EROLE } from "./global/globalEum";
import ChangePassword from "./screen/auth/ChangePassword";
import Sidebar from "./component/SideBar";
import { Home as HomeIcon, Settings, User } from "lucide-react";
import { MenuItem } from "./global/golbalObject";
import Home from "./screen/home/Home";
// import Home from "./screen/home/Home";


function App() {
  const isLogin = useAppSelector((status) => status.route.isLogin);
  const role = useAppSelector((status) => status.route.role);

  // if (isLogin) {
  if (role === EROLE.DOCTOR) {
    const menuItems: MenuItem[] = [
      { name: "Home", icon: <HomeIcon size={20} />, link: "#" },
      { name: "Profile", icon: <User size={20} />, link: "/home" },
      { name: "Settings", icon: <Settings size={20} />, link: "#" },
      { name: "Setti", icon: <Settings size={20} />, link: "#" },
    ]
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Sidebar menuItems={menuItems} />
        <Routes>
          <Route path="/home" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password/:token" element={<ChangePassword />} />
        </Routes>
      </div>
    );
  } else {
    const menuItems = [
      { name: "Home", icon: <HomeIcon size={20} />, link: "/home" },
      { name: "Appointment", icon: <User size={20} />, link: "/home" },
      { name: "Settings", icon: <Settings size={20} />, link: "/forgot-password" },
      { name: "Setti", icon: <Settings size={20} />, link: "/home" },
    ]
    return (
      <div className="h-screen w-full flex flex-row">
        <Sidebar menuItems={menuItems} />
        <div className="h-[100%] w-full">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/home1" element={<Home />} />
          <Route path="/home2" element={<Home />} />
        </Routes>
        </div>
      </div>
    )
  }
  // } else {
  //   return (
  //     <div className="h-screen w-full flex items-center justify-center">
  //       <Routes>
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/forgot-password" element={<ForgotPassword />} />
  //         <Route path="/change-password/:token" element={<ChangePassword />} />
  //         <Route path="*" element={<Login />} />
  //       </Routes>
  //     </div>
  //   );
  // }
}

export default App;
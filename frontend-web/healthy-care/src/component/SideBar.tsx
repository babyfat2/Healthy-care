import { useState } from "react";
import { LogOut as  IconLogout} from "lucide-react";
import { MenuItem } from "../global/golbalObject";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook/hook";
import { logout } from "../redux/slide/user";


const Sidebar = ({ menuItems }: { menuItems: MenuItem[] }) => {
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const chooseMenu = (link: string, name: string) => {
    setActive(name);
    navigate(link);
  }

  const logoutButton = () => {
    dispatch(logout());
  }
  return (
    <div className="w-64 h-screen bg-bgcharcoal-gray text-white flex flex-col p-4 gap-4 absolute">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <img src="/images/logo.png" className="size-18 p-2 bg-bgblue rounded-4xl" />
        <h1 className="text-2xl text-blue">Healthy care</h1>
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`cursor-pointer w-full flex items-center gap-3 p-3 rounded-lg transition-all ${active === item.name ? "bg-blue-800" : "hover:bg-blue-500"
              }`}
            onClick={() => chooseMenu(item.link, item.name)}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </nav>
      <button
      onClick={logoutButton} 
      className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer">
        <IconLogout size={20} /> Logout
      </button>
    </div>
  );
};

export default Sidebar;

import { User } from "lucide-react";


const Header = () => {
    const user = {
        avatar: undefined,
        name: "Đỗ Minh Đức",
    }
  return (
    <div className="flex items-center p-2 bg-blue-50 shadow-lg">
      <div className="flex items-center space-x-3 ml-auto">


        {/* Tên người dùng */}
        <span className="text-gray-800 font-medium">
          {user?.name || "Guest"}
        </span>

        { user.avatar ? <img
          src={user?.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="w-8 h-8 rounded-full object-cover border"
        /> : (
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center shadow-md">
              <User size={24} className="text-gray-600" />
            </div>
          )}
      </div>
    </div>
  );
};

export default Header;

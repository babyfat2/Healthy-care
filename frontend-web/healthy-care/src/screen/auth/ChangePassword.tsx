import { useEffect, useState } from "react";
import InputText from "../../component/input/InputText"
import { useNavigate } from "react-router-dom";
import { useVerifyTokenMutation } from "../../redux/api/auth";
import { useParams } from 'react-router-dom';



function ChangePassword() {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>();
    const [passwordConfirm, setPasswordConfirm] = useState<string>();
    const [errorPassword, setErrorPassword] = useState<string>();
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState<string>();
    const [verifyToken] = useVerifyTokenMutation();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            verifyToken(token)
                .unwrap()
                .catch(error => {
                    console.log(error);
                    // navigate("/login");
                })
        }
    }, [])

    return (
        <div className="bg-[url(/images/auth-background.png)] bg-cover bg-center w-screen h-full flex justify-center items-center">
            <div className="w-100 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-5 justify-center items-center">
                <img src="/images/logo.png" className="w-18 h-18" />
                <p className="font-extrabold text-2xl text-blue-800">Healthy care</p>
                <InputText required label="Mật khẩu" width="w-[100%]" placeholder="Thay đổi mật khẩu" type="password" value={password} onChange={setPassword} errorText={errorPassword} />
                <InputText required label="Xác nhận mật khẩu" width="w-[100%]" placeholder="Xác nhận lại mật khẩu" type="password" value={passwordConfirm} onChange={setPasswordConfirm} errorText={errorPasswordConfirm} />
                <div className="w-full h-10 text-black flex justify-end">
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent transition duration-300 hover:from-indigo-500 hover:to-blue-500 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
                        Đăng nhập
                    </span>
                </div>
                <button className="px-10 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl text-white font-bold transition-all duration-300 hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg hover:scale-105 cursor-pointer"
                >
                    Xác nhận
                </button>
            </div>
        </div>
    )
}

export default ChangePassword;

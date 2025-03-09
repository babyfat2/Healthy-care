import { useNavigate } from "react-router-dom";
import InputText from "../../component/input/InputText"
import { useSendMailMutation } from "../../redux/api/auth";
import { useState } from "react";
import { isValidEmail } from "../../valid/validEmail";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [errorEmail, setErrorEmail] = useState<string>();
  const [sendEmail] = useSendMailMutation();

  const buttonSendMail = () => {
    if (email && email.length > 0) {
      if (!isValidEmail(email)) {
        setErrorEmail("Email sai định dạng.");
      } else {
        setErrorEmail("");
        sendEmail({ email })
          .unwrap()
          .then(e => {
            navigate("/login");
          })
          .catch(error => {
            setErrorEmail(error?.data?.message)
          })
      }
    }
  }

  return (
    <div className="bg-[url(/images/auth-background.png)] bg-cover bg-center w-screen h-full flex justify-center items-center">
      <div className="w-100 h-120 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-5 justify-center items-center">
        <img src="/images/logo.png" className="w-18 h-18" />
        <p className="font-extrabold text-2xl">Healthy care</p>
        <InputText label="Email" width="w-[100%]" type="text" placeholder="Nhập email của bạn để thay đổi mật khẩu" required onChange={setEmail} errorText={errorEmail} />
        <div className="w-full h-10 text-black flex justify-end">
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent transition duration-300 hover:from-indigo-500 hover:to-blue-500 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Đăng nhập
          </span>
        </div>
        <button
          onClick={buttonSendMail}
          className="px-10 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl text-white font-bold transition-all duration-300 hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg hover:scale-105 cursor-pointer"
        >
          Gửi email
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword;

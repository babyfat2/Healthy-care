import { useState } from "react";
import InputText from "../../component/input/InputText"
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/auth";
import { isValidEmail } from "../../valid/validEmail";
import { isValidPassword } from "../../valid/validPassword";

/**
 * Renders the login screen for the application, allowing users to input their email and password to log in.
 * Utilizes state management to handle input values and potential error messages for incorrect email or password formats.
 * Provides navigation options to the forgot password screen and processes login requests through a mutation hook.
 * Validates email and password using defined criteria and displays error messages when necessary.
 */

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorEmail, setErrorEmail] = useState<string>();
  const [errorPassword, setErrorPassword] = useState<string>();
  const [errorLogin, setErrorLogin] = useState<string>();
  const [login] = useLoginMutation();

  const buttonLogin = () => {
    if (email && password) {
      if (!isValidEmail(email) && email.length > 0) {
        setErrorEmail("Email sai định dạng.")
      } else {
        setErrorEmail("");
      }
      if (!isValidPassword(password) && password.length > 0) {
        setErrorPassword("Password phải có tối thiểu 8 ký tự chứa ít nhất 1 chữ in hoa, 1 chữ cái đặc biệt và 1 ký tự đặc biệt(!@#$%^&*).")
      } else {
        setErrorPassword("");
      }

      if (isValidEmail(email) || isValidPassword(password)) {
        login({ username: email, password })
          .unwrap()
          .then(e => {
            console.log(e);
            setErrorLogin('');
          })
          .catch(error =>
            setErrorLogin(error?.data?.message)
          )
      }
    }
  }

  return (
    <div className="bg-[url(/images/auth-background.png)] bg-cover bg-center w-screen h-full flex justify-center items-center">
      <div className="w-100 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-5 justify-center items-center">
        <img src="/images/logo.png" className="w-18 h-18" />
        <p className="font-extrabold text-2xl text-blue-800">Healthy care</p>
        <InputText required label="Email" width="w-[100%]" placeholder="Nhập email của bạn" type="text" value={email} onChange={setEmail} errorText={errorEmail} />
        <InputText required label="Mật khẩu" width="w-[100%]" placeholder="Nhập mật khẩu của bạn" type="password" value={password} onChange={setPassword} errorText={errorPassword} />
        <div className="w-full h-10 text-black flex justify-between">
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent transition duration-300 hover:from-indigo-500 hover:to-blue-500 cursor-pointer hover:underline" onClick={() => navigate("/forgot-password")}>
            Quên mật khẩu
          </span>
          {errorLogin && <p className="text-red-500 text-sm w-40">{errorLogin}</p>}
        </div>
        <button className="px-10 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl text-white font-bold transition-all duration-300 hover:from-indigo-500 hover:to-blue-500 hover:shadow-lg hover:scale-105 cursor-pointer"
          onClick={buttonLogin}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  )
}

export default Login;

import { useContext, useState } from "react";
import axios from 'axios';
import { AppContext } from "../Components/Context/AppContext";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const {url, setToken} = useContext(AppContext)
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUrl = url.replace(/\/+$/, ''); 
    if(isLogin) {
        newUrl += '/auth/login'
    }
    else {
        newUrl += '/auth/register'
    }
    try {
        const response = await axios.post(newUrl, data);
        if(response.data.success) {
            const receivedToken = response.data.token;
            setToken(receivedToken);
            localStorage.setItem('token', receivedToken);
            navigate('/home');
            toast.success(response.data.message)
        }
        else {
          toast.error(response.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[500px] max-w-[95%] mx-auto mt-20 flex flex-col justify-center shadow p-2.5 rounded-md shadow-slate-800"
    >
      <h2 className="text-center mb-2.5">
        {isLogin ? (
          <span className="text-slate-700">
            don&apos;t have an account?{" "}
            <span
              className="cursor-pointer text-blue-500 uppercase hover:border-b hover:border-blue-500"
              onClick={() => setIsLogin(false)}
            >
              register
            </span>
          </span>
        ) : (
          <span className="text-slate-700">
            already have an account?{" "}
            <span
              className="cursor-pointer text-blue-500 uppercase hover:text-blue-400 hover:border-b hover:border-blue-500"
              onClick={() => setIsLogin(true)}
            >
              login
            </span>
          </span>
        )}
      </h2>
      <input
        className="border border-blue-500 w-full mb-5 p-2.5 rounded-md outline-gray-400 shadow-sm shadow-gray-400 text-gray-600"
        type="text"
        name="username"
        placeholder="Enter your username"
        onChange={handleChange}
        value={data.username}
      />
      <div className="flex relative">
        <input
          className="border border-blue-500 w-full mb-5 p-2.5 rounded-md outline-gray-400 shadow-sm shadow-gray-400 text-gray-600"
          type={isPassword ? "password" : "text"}
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={data.password}
        />
        {isPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 absolute right-2 top-[20%] text-slate-500 cursor-pointer"
            onClick={() => setIsPassword(!isPassword)}
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fillRule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 absolute right-2 top-[20%] text-slate-500 cursor-pointer"
            onClick={() => setIsPassword(!isPassword)}
          >
            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
            <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
            <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
          </svg>
        )}
      </div>

      {!isLogin && (
        <input
          className="border border-blue-500 w-full mb-5 p-2.5 rounded-md outline-gray-400 shadow-sm shadow-gray-400 text-gray-600"
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={data.email}
        />
      )}

      <button
        className="bg-blue-500 p-1 text-white rounded-md mb-2"
        type="submit"
      >
        {isLogin ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default Auth;

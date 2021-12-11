import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Login () {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        axios.interceptors.response.use((response) => {
            return response?.data;
        }, (error) => {
            if (error) {
                toast.error(error.response?.data?.message)
            }
        });
        axios.post('http://localhost:5001/api/auth/login', {
            email: emailAddress,
            password: password
        });
    }
    return (

        <div className="container mx-auto items-center max-w-sm">
            <ToastContainer/>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        onChange={({ target }) => setEmailAddress(target.value)}
                        value={emailAddress}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Email"/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        onChange={({ target }) => setPassword(target.value)}
                        value={password}
                        className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="password" placeholder="***********"/>
                </div>
                <div>
                    <button
                        onClick={login}
                        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 "
                        type="button">
                        Login
                    </button>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2021 Job
            </p>
        </div>
    );
}
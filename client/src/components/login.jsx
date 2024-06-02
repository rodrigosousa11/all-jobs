import React, { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const api_base = "http://localhost:3000";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(api_base + "/users/login", {
                email,
                password
            });
            const token = response.data.accessToken;

            setError("");
            if (rememberMe) {
                localStorage.setItem("token", token);
            } else {
                sessionStorage.setItem("token", token);
            }
            console.log("Login successful", response.data);
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error("Login failed", error.response.data);
            setError(error.response.data.message);
        }
    };

    return (
        <div className="flex-grow flex justify-center items-center bg-zinc-200">
            <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col">
                <p className="text-2xl font-bold py-6">
                    Welcome back!
                </p>
                <form onSubmit={handleLogin}>
                    <div className="flex flex-col mb-4">
                        <label>Email</label>
                        <input
                            className="border rounded relative bg-zinc-50 p-2"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label>Password</label>
                        <input
                            className="border rounded relative bg-zinc-50 p-2"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="w-full py-3 mt-8 bg-gray-600 hover:bg-gray-500 relative rounded text-white">
                        Sign In
                    </button>
                    <p className="flex items-center mt-2">
                        <input 
                            className="mr-2" 
                            type="checkbox" 
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Remember Me
                    </p>
                    {/* <div className="flex justify-center py-6">
                        <p className="border rounded shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                            <FcGoogle className="mr-2" /> Google
                        </p>
                    </div> */}
                    <p className="text-center mt-7">
                        Not a member? <Link to="/signup" className="text-gray-400 hover:underline">Sign up now</Link>
                    </p>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 mt-4 px-4 py-2 rounded relative justify-center" role="alert">
                        <p className="block sm:inline">{error}</p>
                    </div>}
                </form>
            </div>
        </div>
    );
}

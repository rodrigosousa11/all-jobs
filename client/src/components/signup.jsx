import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const api_base = "http://localhost:3000";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordTouched, setPasswordTouched] = useState(false); // Track if password field has been touched
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(api_base + "/users/register", {
                firstName,
                lastName,
                email,
                password
            });

            setError("");
            console.log("Signup successful", response.data);
            navigate("/login");
            
        } catch (error) {
            console.error("Signup failed", error.response.data);
            setError(error.response.data.message);
        }
    };

    const validatePassword = (password) => {
        // Minimum password length requirement
        const hasUpperCase = /[A-Z]/.test(password); // Check for uppercase letters
        const hasNumber = /[0-9]/.test(password); // Check for numbers
        return password.length >= 8 && hasUpperCase && hasNumber;
    };

    return (
        <div className="flex-grow flex justify-center items-center bg-zinc-200">
            <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col">
                <p className="text-2xl font-bold py-6">
                    Glad to have you here!
                </p>
                <form onSubmit={handleSignup} className="flex flex-col">
                    <div className="flex flex-col mb-4">
                        <label>First Name</label>
                        <input
                            className="border relative bg-zinc-50 rounded p-2"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label>Last Name</label>
                        <input
                            className="border relative bg-zinc-50 rounded p-2"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label>Email</label>
                        <input
                            className="border relative bg-zinc-50 rounded p-2"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label>Password</label>
                        <input
                            className={`border relative bg-zinc-50 rounded p-2 ${
                                password && !validatePassword(password) && passwordTouched
                                    ? "border-red-500" 
                                    : ""
                            }`}
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordTouched(true);
                            }}
                        />
                        {!validatePassword(password) && passwordTouched && (
                            <p className="text-red-500 text-sm mt-1">
                                Password must be at least 8 characters long and contain at least one uppercase letter and one number.
                            </p>
                        )}
                    </div>
                    <button
                        className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-500 relative rounded  text-white"
                        disabled={!validatePassword(password)} // Disable button if password is invalid
                    >
                        Sign Up
                    </button>
                    {/* <div className="flex justify-center py-6">
                        <p className="border rounded shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
                            <FcGoogle className="mr-2" /> Google
                        </p>
                    </div> */}
                    <p className="text-center mt-7">
                        Have an account already? <Link to="/login" className="text-indigo-600 hover:underline">Login now</Link>
                    </p>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 mt-4 px-4 py-2 rounded relative" role="alert">
                        <p className="block sm:inline">{error}</p>
                    </div>}
                </form>
            </div>
        </div>
    );
}

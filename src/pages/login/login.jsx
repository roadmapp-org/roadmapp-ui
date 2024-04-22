import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { Form, useNavigate } from "react-router-dom";
import { login } from '../../data/login-slice';

export const Login = () => {

    const [showError, setShowError] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token != null) {
            navigate(`/home`);
        }
    })

    const onSubmit = async (event) => {
        event.preventDefault();
        const loginData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }

        const result = await dispatch(login(loginData));

        if(result.type === "auth/login/rejected") {
            setError(result.error.message)
            setShowError(true);
        } else {
            navigate(`/home`);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-custom-grey p-6">
            <div className="flex-col p-6 space-y-8 bg-custom-white rounded-lg shadow-lg w-full max-w-md">
                <img src="roadmap.png" className="w-24 h-24 mx-auto" />
                <div className="flex justify-center text-3xl">
                    <h1>RoadmApp</h1>
                </div>
                <Form className="space-y-6" method="post" onSubmit={onSubmit}>
                    <div>
                        <input 
                            className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none border-cyan-500 focus:ring-cyan-900 focus:border-cyan-900 sm:text-sm" 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Username" 
                        />
                    </div>
                    <div>
                        <input 
                            className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none border-cyan-500 focus:ring-cyan-900 focus:border-cyan-900 sm:text-sm" 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Password" 
                        />
                    </div>
                    <div>
                        <input 
                            className="w-full py-2 px-4 mb-8 border border-transparent rounded-md shadow-lg text-sm font-medium bg-custom-blue" 
                            type="submit" 
                            value="Login" 
                        />
                    </div>
                </Form>
                {showError && <p className="text-red-600 text-center font-medium">{error}</p>}
            </div>
        </div>
    );
}
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-900 p-5">
            <div className="p-6 space-y-8 bg-gray-200 rounded shadow-md w-full max-w-md">
                <img src="roadmap.png" className="w-44 h-44 self-center justify-self-center mx-auto" />
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
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-900 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
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
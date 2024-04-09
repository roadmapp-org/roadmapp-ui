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
        <>
            <h1>Login</h1>
            <Form method="post" onSubmit={onSubmit} >
                <input type="text" name="username" id="username" placeholder="Username" />
                <input type="password" name="password" id="password" placeholder="Password" />
                <input type="submit" value="Login" />
                <br></br>
                {showError && <p>{error}</p>}
            </Form>
        </>
    );
}
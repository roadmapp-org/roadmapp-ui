import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Form, useNavigate } from "react-router-dom";
import { login } from './login-slice';

export const Login = () => {
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await dispatch(login({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            }));
            if(result.type === "auth/login/rejected") {
                setShowError(true);
            } else {
                navigate(`/home`);
            }
        } catch (err) {
            console.log(err);
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
                {showError && <p>Invalid username or password</p>}
            </Form>
        </>
    );
}
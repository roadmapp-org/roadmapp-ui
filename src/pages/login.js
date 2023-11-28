import { useDispatch } from 'react-redux'
import { Form } from 'react-router-dom';
import { login } from '../data/slices/login-slice';

export async function action({request,params}) {
    
}

export const Login = () => {
    const dispatch = useDispatch();
    const onSubmit = async () => {
        dispatch(login({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }));
    }

    return (
        <>
            <h1>Login</h1>
            <Form method="post" id="login-form" onSubmit={onSubmit}>
                <input type="text" name="username" id="username" placeholder="Username" />
                <input type="password" name="password" id="password" placeholder="Password" />
                <input type="submit" value="Login" />
            </Form>
        </>
    );
}
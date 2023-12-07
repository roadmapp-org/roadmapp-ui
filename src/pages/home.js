import {loggedUser} from '../data/slices/login-slice'

export const Home = () => {
    return (
        <div>
            <h1>{loggedUser}</h1>
            <h1>Home</h1>
        </div>
    );
}
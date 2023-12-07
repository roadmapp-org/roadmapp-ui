import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const login = createAsyncThunk(
    'auth/login',
    async (credentials) => {
        
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
        const token = response.headers.get('authorization');

        if(token != null && token != undefined && token != '')
            return token;
        else
            throw new Error('Login failed');

    }
);

const initialState = {
    auth: {
        user: {
            token: "",
            username: null
        },
        status: null,
        error: null
    },
    status: null,
    error: null
};

const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            console.log(state.auth.user.token)
            state.auth.user = {
                token: null,
                username: null
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.auth.user.token = action.payload;
                console.log(state.auth.user.token)
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default loginSlice;

export const selectCurrentUser = (state) => state.auth.user;

export const { logout } = loginSlice.actions
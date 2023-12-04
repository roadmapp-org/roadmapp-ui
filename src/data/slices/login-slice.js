import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const login = createAsyncThunk(
    'auth/login',
    async (credentials) => {
        /*
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();*/
        if(credentials.username === "A129153" || credentials.username === "tobiolea" && credentials.password === "bbva1234")
            return "token";
        else
            throw new Error('Login failed');

    }
);


const loginSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default loginSlice;
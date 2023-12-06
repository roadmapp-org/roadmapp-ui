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


const loginSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            token: null,
            username: null
        },
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
                state.user.token = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default loginSlice;
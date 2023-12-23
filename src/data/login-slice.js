import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const login = createAsyncThunk('auth/login', async (credentials) => {
        let response;
        try {
            
            response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

        } catch (error) {
            throw new Error('Server error.');
        }

        const token = response.headers.get('authorization');

        if(token !== null && token !== undefined && token !== '')
            return token;
        
        throw new Error('Wrong credentials.');
    }
);

const initialState = {
    token: localStorage.getItem('token') || null,
    status: "idle",
    error: ""
};

const loginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload;
                localStorage.setItem('token', action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export const selectCurrentUser = (state) => state.token;
export const { logout } = loginSlice.actions

export default loginSlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    showCurrentFilterLogError: false,
    showCreateLogModal: false
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toogleCurrentFilterLogError: (state, action) => {
            state.showCurrentFilterLogError = (action.payload === undefined) ? !state.showCurrentFilterLogError : action.payload;
        },
        toogleShowCreateLogModal: (state, action) => {
            state.showCreateLogModal = (action.payload === undefined) ? !state.showCreateLogModal : action.payload;
        }
    },
    extraReducers: (builder) => {
        
    }
});

export const { toogleCurrentFilterLogError, toogleShowCreateLogModal } = layoutSlice.actions

export default layoutSlice.reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createLog } from './log-slice'

const initialState = {
    showCurrentFilterLogError: false,
    showCreateLogModal: false,
    showBurgerMenu: false
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
        },
        toogleShowBurgerMenu: (state, action) => {
            state.showBurgerMenu = (action.payload === undefined) ? !state.showBurgerMenu : action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createLog.fulfilled, (state, action) => {
            state.showCreateLogModal = false;
        })
    }
});

export const { toogleCurrentFilterLogError, toogleShowCreateLogModal, toogleShowBurgerMenu } = layoutSlice.actions

export default layoutSlice.reducer;
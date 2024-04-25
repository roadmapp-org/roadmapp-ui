import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    showCurrentFilterLogError: false 
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toogleCurrentFilterLogError: (state, action) => {
            state.showCurrentFilterLogError =
                (action.payload === undefined) ?
                    !state.showCurrentFilterLogError :
                    action.payload;
        }
    },
    extraReducers: (builder) => {
        
    }
});

export const { toogleCurrentFilterLogError } = layoutSlice.actions

export default layoutSlice.reducer;
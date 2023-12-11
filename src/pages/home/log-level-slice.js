import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLevels = createAsyncThunk('logs/fetch', async() => {
    console.log("logs/fetch")
    const bearerToken = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/home', {
        headers: {
            Authorization: `Bearer ${bearerToken}`
        }
    });
    return response.json();
}
)

const initialState = {
    projects: [],
    tasks: [],
    subtasks: [],
    status: "idle",
    error: ""
}

const logLevelSlice = createSlice({
    name: 'logLevel',
    initialState,
    redcer: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getLevels.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getLevels.fulfilled, (state, action) => {
                state.projects = action.payload.list.projectList
                state.tasks = action.payload.list.taskList
                state.subtasks = action.payload.list.subtaskList
            })
            .addCase(getLevels.rejected, (state,action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
    }
})

export default logLevelSlice.reducer;
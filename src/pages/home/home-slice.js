import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getHome = createAsyncThunk('logs/fetch', async() => {
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
    logs: [],
    status: "idle",
    error: ""
}


const homeSlice = createSlice({
    name: 'home',
    initialState,
    redcer: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getHome.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getHome.fulfilled, (state, action) => {
                state.projects = action.payload.list.projectList
                state.tasks = action.payload.list.taskList
                state.subtasks = action.payload.list.subtaskList
                state.logs = action.payload.list.logList
            })
            .addCase(getHome.rejected, (state,action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
    }
})

export default homeSlice.reducer;
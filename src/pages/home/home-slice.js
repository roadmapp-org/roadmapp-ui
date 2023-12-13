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
    selectedProject: "0",
    selectedTask: "0",
    selectedSubtask: "0",
    status: "idle",
    error: ""
}


const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        projectSelected: (state, action) => {
            state.selectedProject = action.payload
        },
        taskSelected: (state, action) => {
            state.selectedTask = action.payload
        },
        subtaskSelected: (state, action) => {
            state.selectedSubtask = action.payload
        }
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

export const selectSelectedProject = (state) => state.home.selectedProject;
export const selectSelectedTask = (state) => state.home.selectedTask;
export const selectSelectedSubtask = (state) => state.home.selectedSubtask;

export const { projectSelected, taskSelected, subtaskSelected } = homeSlice.actions;

export default homeSlice.reducer;
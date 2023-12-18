import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLevels = createAsyncThunk('home/fetch', async() => {
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
            state.selectedTask = "0"
            state.selectedSubtask = "0"
        },
        taskSelected: (state, action) => {
            state.selectedTask = action.payload
            state.selectedSubtask = "0"
        },
        subtaskSelected: (state, action) => {
            state.selectedSubtask = action.payload
        }
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
                state.logs = action.payload.list.logList
            })
            .addCase(getLevels.rejected, (state,action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
    }
})

export const selectSelectedProject = (state) => state.home.selectedProject;
export const selectSelectedTask = (state) => state.home.selectedTask;
export const selectSelectedSubtask = (state) => state.home.selectedSubtask;
export const selectLogList = (state) => state.home.logs;

export const logSliceSelectors = {
    selectSelectedProject,
    selectSelectedTask,
    selectSelectedSubtask,
    selectLogList
}

export const { projectSelected, taskSelected, subtaskSelected } = homeSlice.actions;

export default homeSlice.reducer;
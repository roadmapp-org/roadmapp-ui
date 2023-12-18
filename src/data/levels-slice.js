import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLevels = createAsyncThunk('levels/fetch', async() => {
    const bearerToken = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/levels', {
        headers: {
            Authorization: `Bearer ${bearerToken}`
        }
    });
    return response.json();
}
)

export const createProject = createAsyncThunk('levels/createProject', async(persist) => {
    const bearerToken = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`
        },
        body: JSON.stringify(persist)
    });

    if(!response.ok)
        throw new Error('Error when saving the log');

    return response.json();
})

export const editProject = createAsyncThunk('levels/editProject', async(persist) => {
    const bearerToken = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/project', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`
        },
        body: JSON.stringify(persist)
    });
    if(!response.ok)
        throw new Error('Error when saving the log');

    return response.json();
})

const initialState = {
    projects: [],
    tasks: [],
    subtasks: [],
    logs: [],
    selectedProject: "0",
    selectedTask: "0",
    selectedSubtask: "0",
    status: "idle",
    error: "",
    creationStatus: "idle",
    editStatus: "idle"
}


const levelsSlice = createSlice({
    name: 'levels',
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
            .addCase(createProject.pending, (state) => {
                state.creationStatus = 'loading'
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.creationStatus = 'succeeded';
                state.projects.push(action.payload.persistedObject)
            })
            .addCase(createProject.rejected, (state,action) => {
                state.creationStatus = 'rejected';
                state.error = action.error.message;
            })
            .addCase(editProject.pending, (state) => {
                state.editStatus = 'loading'
            })
            .addCase(editProject.fulfilled, (state, action) => {
                state.editStatus = 'succeeded';
                const index = state.projects.findIndex((project) => project.id === action.payload.persistedObject.id)
                state.projects[index] = action.payload.persistedObject
            })
            .addCase(editProject.rejected, (state,action) => {
                state.editStatus = 'rejected';
                state.error = action.error.message;
            })
    }
})

export const selectSelectedProject = (state) => state.levels.selectedProject;
export const selectSelectedTask = (state) => state.levels.selectedTask;
export const selectSelectedSubtask = (state) => state.levels.selectedSubtask;
export const selectLogList = (state) => state.levels.logs;

export const levelsSliceSelectors = {
    selectSelectedProject,
    selectSelectedTask,
    selectSelectedSubtask,
    selectLogList
}

export const { projectSelected, taskSelected, subtaskSelected } = levelsSlice.actions;

export default levelsSlice.reducer;
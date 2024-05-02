import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLevels = createAsyncThunk('levels/fetch', async() => {
    let response;
    const bearerToken = localStorage.getItem('token');
    try {
         response = await fetch('http://localhost:8080/levels', {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
    } catch (error) {
        throw new Error('Server error. Try again later.');
    }
    
    return response.json();
})

export const createProject = createAsyncThunk('levels/createProject', async(persist) => {
    let response;
    const bearerToken = localStorage.getItem('token');
    try{
        response = await fetch('http://localhost:8080/project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`
        },
        body: JSON.stringify(persist)
        });
    } catch (error) {
        throw new Error('Server error. Try again later.');
    }

    if(!response.ok)
        throw new Error('Error when saving the project');

    return response.json();
})

export const editProject = createAsyncThunk('levels/editProject', async(persist) => {
    let response;
    const bearerToken = localStorage.getItem('token');
    try {
        response = await fetch('http://localhost:8080/project', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`
            },
            body: JSON.stringify(persist)
        });
    } catch (error) {
        throw new Error('Server error. Try again later.');
    }

    if(!response.ok)
        throw new Error('Error when editing the log');

    return response.json();
})

export const deleteProject = createAsyncThunk('levels/deleteProject', async(persist) => {
    let response;
    const bearerToken = localStorage.getItem('token');
    try {
        response = await fetch('http://localhost:8080/project', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`
            },
            body: JSON.stringify(persist)
        });
    } catch (error) {
        throw new Error('Server error. Try again later.');
    }

    if(!response.ok)
        throw new Error('Error when deleting the log');

    return response.json();
})

export const editTask = createAsyncThunk('levels/editTask', async(persist) => {
    let response;
    const bearerToken = localStorage.getItem('token');
    try {
        response = await fetch('http://localhost:8080/task', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`
            },
            body: JSON.stringify(persist)
        });
    } catch (error) {
        throw new Error('Server error. Try again later.');
    }
    
    if(!response.ok)
        throw new Error('Error when saving the log');

    return response.json();
})

export const deleteTask = createAsyncThunk('levels/deleteTask', async (persist) => {
    let response;
    const bearerToken = localStorage.getItem('token');
    try {
        response = await fetch('http://localhost:8080/task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`
            },
            body: JSON.stringify(persist)
        });
    } catch (error) {
        
    }

    if(!response.ok)
        throw new Error('Error when deleting the log');

    return response.json();
})

export const createTask = createAsyncThunk('levels/createTask', async(persist) => {
    let response;
    const bearerToken = localStorage.getItem('token');
    try {
        response = await fetch('http://localhost:8080/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`
            },
            body: JSON.stringify(persist)
        });
    } catch (error) {
        throw new Error('Server error. Try again later.');
    }

    if(!response.ok)
        throw new Error('Error when saving the log');

    return response.json();
})

const initialState = {
    projects: [],
    tasks: [],
    subtasks: [],
    logs: [],
    selectedProject: 0,
    selectedProjectName: "",
    selectedTask: 0,
    selectedTaskName: "",
    selectedProjectOnConfigPage: 0,
    selectedSubtask: "0",
    status: "idle",
    error: "",
    creationStatus: "idle",
    taskCreationStatus: "idle",
    editStatus: "idle"
}


const levelsSlice = createSlice({
    name: 'levels',
    initialState,
    reducers: {
        projectSelected: (state, action) => {
            state.selectedProject = action.payload
            state.selectedTask = 0
            state.selectedSubtask = 0
        },
        projectNameSelected: (state, action) => {
            state.selectedProjectName = action.payload
        },
        taskSelected: (state, action) => {
            state.selectedTask = action.payload
            state.selectedSubtask = 0
        },
        taskNameSelected: (state, action) => {
            state.selectedTaskName = action.payload
        },
        subtaskSelected: (state, action) => {
            state.selectedSubtask = action.payload
        },
        projectSelectedOnConfigPage: (state, action) => {
            state.selectedProjectOnConfigPage = action.payload
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
            .addCase(deleteProject.pending, (state) => {
                state.editStatus = 'loading'
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.editStatus = 'succeeded';
                state.tasks = state.tasks.filter((task) => task.project_id !== action.payload.persistedObject.id)
                const index = state.projects.findIndex((project) => project.id === action.payload.persistedObject.id)
                state.projects.splice(index, 1)
            })
            .addCase(deleteProject.rejected, (state,action) => {
                state.editStatus = 'rejected';
                state.error = action.error.message;
            })
            .addCase(editTask.pending, (state) => {
                state.editStatus = 'loading'
            })
            .addCase(editTask.fulfilled, (state, action) => {
                state.editStatus = 'succeeded';
                const index = state.tasks.findIndex((task) => task.id === action.payload.persistedObject.id)
                state.tasks[index] = action.payload.persistedObject
            })
            .addCase(editTask.rejected, (state,action) => {
                state.editStatus = 'rejected';
                state.error = action.error.message;
            })
            .addCase(deleteTask.pending, (state) => {
                state.editStatus = 'loading'
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.editStatus = 'succeeded';
                const index = state.tasks.findIndex((task) => task.id === action.payload.persistedObject.id)
                state.tasks.splice(index, 1)
            })
            .addCase(deleteTask.rejected, (state,action) => {
                state.editStatus = 'rejected';
                state.error = action.error.message;
            })
            .addCase(createTask.pending, (state) => {
                state.taskCreationStatus = 'loading'
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.taskCreationStatus = 'succeeded';
                state.tasks.push(action.payload.persistedObject)
            })
            .addCase(createTask.rejected, (state,action) => {
                state.taskCreationStatus = 'rejected';
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

export const { projectSelected, projectNameSelected, taskSelected, taskNameSelected, subtaskSelected, projectSelectedOnConfigPage } = levelsSlice.actions;

export default levelsSlice.reducer;
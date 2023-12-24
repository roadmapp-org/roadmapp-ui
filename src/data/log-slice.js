import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLogs = createAsyncThunk('logs/fetch', async() => {
        const bearerToken = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/logs', {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        return response.json();
    }
)

export const createLog = createAsyncThunk('logs/create', async(log, {rejectWithValue}) => {
    let response;
    const bearerToken = localStorage.getItem('token');
    const persist = {
        projectId: log.projectId,
        taskId: log.taskId,
        subtaskId: log.subtaskId,
        log: log.log
    };
    try {
        response = await fetch('http://localhost:8080/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`
            },
            body: JSON.stringify(persist)
        });
        
    } catch (error) {
        throw new Error('Server error. Please try again later.');
    }
    
    if(!response.ok)
        throw new Error('Error when saving the log');

    return response.json();
})     

export const fetchFilteredLogs = createAsyncThunk('logs/filter', async(filters) => {
    const baseUrl = 'http://localhost:8080/logs/filtered';
    const url = new URL(baseUrl);
    Object.keys(filters).forEach(key => url.searchParams.append(key, filters[key]));

    const bearerToken = localStorage.getItem('token');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`
        }
    });
    return response.json();
})

const initialState = {
    list: [],
    status: "idle",
    creationStatus: "idle",
    error: "",
    creationError: ""
}

const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        setCreationError: (state, action) => {
            state.creationError = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createLog.pending, (state) => {
                state.creationStatus = 'loading';
            })
            .addCase(createLog.fulfilled, (state, action) => {
                state.creationStatus = 'succeeded';
                state.list.push(action.payload.persistedObject);
            })
            .addCase(createLog.rejected, (state, action) => {
                state.creationStatus = 'failed';
                state.creationError = action.error.message;
            })
            .addCase(getLogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLogs.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.list = action.payload.list;
            })
            .addCase(getLogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchFilteredLogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilteredLogs.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.list = action.payload.list;
            })
            .addCase(fetchFilteredLogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

//export const selectLogList = (state) => state.token;
export const { setCreationError } = logSlice.actions;

export default logSlice.reducer;
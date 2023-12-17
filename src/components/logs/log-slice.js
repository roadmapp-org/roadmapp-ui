import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLogs = createAsyncThunk('logs/fetch', async() => {
        console.log("logs/fetch")
        const bearerToken = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/logs', {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        });
        return response.json();
    }
)

export const createLog = createAsyncThunk('logs/create', async(log) => {
        const persist = {
            projectId: log.projectId,
            taskId: log.taskId,
            subtaskId: log.subtaskId,
            log: log.log
        };
        const bearerToken = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`
            },
            body: JSON.stringify(persist)
        });
        return response.json();
})     

export const fetchFilteredLogs = createAsyncThunk('logs/filter', async(filters) => {
    const baseUrl = 'http://localhost:8080/logs/filtered';
    const url = new URL(baseUrl);
    Object.keys(filters).forEach(key => url.searchParams.append(key, filters[key]));

    const bearerToken = localStorage.getItem('token');
    console.log("logs/filter/before server")
    console.log(url)

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`
        }
    });
    console.log("logs/filter/after server")
    return response.json();
})

const initialState = {
    list: [],
    status: "idle",
    error: ""
}

const logSlice = createSlice({
    name: 'log',
    initialState,
    reducer: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createLog.pending, (state) => {
                console.log("createLog.pending");
                state.status = 'loading';
            })
            .addCase(createLog.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log("createLog.fulfilled");
                console.log(action.payload);
                state.list.push(action.payload.persistedObject);
            })
            .addCase(createLog.rejected, (state, action) => {
                console.log("createLog.rejected");
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getLogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLogs.fulfilled, (state,action) => {
                console.log("getLogs.fulfilled");
                console.log(action.payload)
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
                console.log("fetchFilteredLogs.fulfilled");
                console.log(action.payload.list)
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

export default logSlice.reducer;
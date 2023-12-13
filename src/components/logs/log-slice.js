import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getLogs = createAsyncThunk('logs/fetch', async() => {
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
        builder.
            addCase(getLogs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLogs.fulfilled, (state,action) => {
                console.log("getLogs.fulfilled");
                console.log(action.payload.list)
                state.status = 'succeeded';
                state.list = action.payload.list;
            })
            .addCase(getLogs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export const selectLogList = (state) => state.token;

export default logSlice.reducer;
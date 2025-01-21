import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { httpPost, httpGet } from '../utils';

const loginAdapter = createEntityAdapter();

const initialState = loginAdapter.getInitialState({
    status: "not_logged_in",
    error: 0,
    token: null,
    username: null
});

const baseUrl = "http://localhost:3004";

export const loginServer = createAsyncThunk("users/loginServer", async (login) => {
    return await httpPost(`${baseUrl}/users/login`, login);
});

export const signupServer = createAsyncThunk("users/signinServer", async (userData) => {
    return await httpPost(`${baseUrl}/users/signup`, userData);
});

export const logoutServer = createAsyncThunk("users/logoutServer", async () => {
    return await httpGet(`${baseUrl}/users/logout`);
});

export const loginSlice = createSlice({
    name: 'logins',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(loginServer.fulfilled, (state, action) => {
            state.status = "logged_in";
            loginAdapter.addOne(state, action.payload);
            state.error = 0;
            state.token = action.payload.token;
            state.username = action.payload.username;
        });
        builder.addCase(loginServer.pending, (state, action) => {
            state.error = 0;
        });
        builder.addCase(loginServer.rejected, (state, action) => {
            state.status = "not_logged_in";
            state.error = 2;
        });
        builder.addCase(signupServer.fulfilled, (state, action) => {
            state.status = "logged_in";
        });
        builder.addCase(signupServer.pending, (state, action) => {
            state.error = 0;
        });
        builder.addCase(signupServer.rejected, (state, action) => {
            state.error = 1;
        });
        builder.addCase(logoutServer.fulfilled, (state) => {
            state.status = "not_logged_in";
            loginAdapter.removeOne(state);
            state.token = null;
            state.username = null;
        });
    }
});

export default loginSlice.reducer;

export const {
    selectAll: selectAllLogins
} = loginAdapter.getSelectors(state => state.logins);
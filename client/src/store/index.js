import { createSlice, configureStore } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem('token') || null,
        userId: localStorage.getItem('userId') || null,
    },
    reducers: {
        signin: (state, action) => {
            state.token = localStorage.getItem('token');
            state.userId = localStorage.getItem('userId');
        },
        signout: (state, action) => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            state.token = null;
            state.userId = null;
        }
    }
})

const store = configureStore({
    reducer: { auth: authSlice.reducer }
})

export default store;
export const authActions = authSlice.actions;
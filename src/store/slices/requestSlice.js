import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    requests: [],
}

const requestSlice = createSlice({
    name: 'request',
    initialState: initialState,
    reducers: {
        setRequest: (state, action) => {
            state.requests.push(action.payload)
        },
        deleteRequest: (state, action) => {
            state.requests = state.requests.filter(
                (request) => request._id !== action.payload,
            )
        },
    },
})

export const { setRequest, deleteRequest } = requestSlice.actions

export default requestSlice.reducer

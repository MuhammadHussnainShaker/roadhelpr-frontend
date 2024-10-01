import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
    users: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.users.push(action.payload)
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(
                (user) => user._id !== action.payload,
            )
        },
    },
})

export const { setUser, deleteUser } = userSlice.actions

export default userSlice.reducer

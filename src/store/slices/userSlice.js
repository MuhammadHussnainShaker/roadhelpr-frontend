import { createSlice, nanoid } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
                (user) => user.id !== action.payload,
            )
        },
    },
})

export const { setUser, deleteUser } = userSlice.actions

export default userSlice.reducer


import { createSlice, nanoid } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
    accessToken: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        deleteToken: (state) => {
            state.accessToken = null
        },
    },
})

export const { setAccessToken, deleteToken } = authSlice.actions

export default authSlice.reducer

// Async Storage methods
export const storeTokens = (accessToken, refreshToken) => async (dispatch) => {
    try {
        await AsyncStorage.setItem(
            'authTokens',
            JSON.stringify({ accessToken, refreshToken }),
        )
        dispatch(setAccessToken(accessToken))
    } catch (error) {
        console.log(
            'Failed to store token in async storage. Following error occurred: ',
            error,
        )
    }
}

export const getTokens = () => async (dispatch) => {
    try {
        const tokenString = await AsyncStorage.getItem('authTokens')
        if (tokenString) {
            const { accessToken, refreshToken } = JSON.parse(tokenString)
            dispatch(setAccessToken(accessToken))
        }
    } catch (error) {
        console.log(
            'Failed to get token from async storage. Following error occurred: ',
            error,
        )
    }
}

export const removeTokens = () => async (dispatch) => {
    try {
        await AsyncStorage.removeItem('authTokens')
        dispatch(deleteToken())
    } catch (error) {
        console.log(
            'Failed to remove token from async storage. Following error occurred: ',
            error,
        )
    }
}

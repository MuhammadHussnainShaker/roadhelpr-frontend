import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/colors'
import { LAYOUT } from '../constants/layout'
import AppButton from '../components/AppButton'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { removeTokens } from '../store/slices/authSlice'
import axios from 'axios'
import { IP_ADDRESS } from '../constants/Constants'
import { deleteUser } from '../store/slices/userSlice'

const Settings = () => {
    const users = useSelector((state) => state.user.users)
    const accessToken = useSelector((state) => state.auth?.accessToken)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${IP_ADDRESS}/api/v1/users/logout`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                    timeout: 10000,
                },
            )

            // console.log('User Logged Out Successfully ')

            dispatch(removeTokens())
            dispatch(deleteUser(users[0]._id))
            navigation.replace('Login')

            return response.data
        } catch (error) {
            if (error.response) {
                console.error(
                    'Logout failed, Status: ',
                    error.response.status,
                    'Response: ',
                    error.response.data,
                )
            } else if (error.request) {
                console.error('No response from server: ', error.request)
            } else {
                console.error('Error setting up the request: ', error.message)
            }
            throw error
        }
    }
    return (
        <View style={styles.container}>
            <AppButton title="Logout" onPress={handleLogout} />
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primaryBackground,
        flex: 1,
        paddingLeft: LAYOUT.paddingSmall,
        paddingRight: LAYOUT.paddingSmall,
    },
})

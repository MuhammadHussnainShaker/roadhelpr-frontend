import { View, StyleSheet, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants/colors'
import AppButton from '../components/AppButton'
import { LAYOUT } from '../constants/layout'
import CustomTextInput from '../components/CustomTextInput'
import { Icons } from '../constants/icons'
import axios from 'axios'
import { IP_ADDRESS } from '../constants/Constants'
import { useDispatch } from 'react-redux'
import { storeTokens } from '../store/slices/authSlice'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitLoginData = async () => {
        const userData = {
            email,
            phoneNumber,
            password,
        }

        try {
            const response = await axios.post(
                `${IP_ADDRESS}/api/v1/users/login`,
                userData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    timeout: 10000,
                },
            )

            console.log('User Logged In Successfully ', response.data.data)

            const { accessToken, refreshToken } = response.data.data
            dispatch(storeTokens(accessToken, refreshToken))

            navigation.replace('Main')

            return response.data
        } catch (error) {
            if (error.response) {
                console.error(
                    'Login failed, Status: ',
                    error.response.status,
                    'Response: ',
                    error.response.data,
                )
                Alert.alert(
                    'User ',
                    'Please enable location permissions to use the map.',
                    [{ text: 'OK' }],
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
            <View style={styles.subContainer}>
                <View style={styles.logo}>
                    <Icons.LogoIcon width={250} height={250} />
                </View>
                <Text style={styles.heading}>Log in</Text>
                <CustomTextInput
                    placeholder="Email Address"
                    onChangeText={(text) => setEmail(text)}
                    inputMode="email"
                />
                <CustomTextInput
                    placeholder="Phone Number"
                    onChangeText={(text) => setPhoneNumber(text)}
                    inputMode="tel"
                />
                <CustomTextInput
                    placeholder="Password"
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                    textContentType="password"
                />
                <AppButton title="Login" onPress={submitLoginData} />
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryBackground,
        justifyContent: 'flex-end',
    },
    subContainer: {
        paddingLeft: LAYOUT.paddingMedium,
        paddingRight: LAYOUT.paddingMedium,
        paddingBottom: LAYOUT.paddingLarge,
    },
    heading: {
        fontSize: LAYOUT.fontSizeExtraLarge,
        color: COLORS.primary,
    },
    logo: {
        alignSelf: 'center',
        marginBottom: LAYOUT.marginLarge,
    },
})

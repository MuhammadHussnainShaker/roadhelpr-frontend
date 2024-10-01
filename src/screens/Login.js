import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants/colors'
import AppButton from '../components/AppButton'
import { LAYOUT } from '../constants/layout'
import CustomTextInput from '../components/CustomTextInput'
import { Icons } from '../constants/icons'
import axios from 'axios'
import { IP_ADDRESS } from '../constants/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { storeTokens } from '../store/slices/authSlice'
import { useNavigation } from '@react-navigation/native'
import { setUser } from '../store/slices/userSlice'

const Login = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('customer')

    const submitLoginData = async () => {
        const userData = {
            email,
            phoneNumber,
            password,
            role,
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

            // console.log('User Logged In Successfully ', response.data.data)

            const { accessToken, refreshToken } = response.data.data
            dispatch(storeTokens(accessToken, refreshToken))

            dispatch(setUser(response.data.data.user))

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
                    'User Authentication Failed',
                    'Please make sure your credentails are correct.',
                    [{ text: 'OK' }],
                )
            } else if (error.request) {
                console.error('No response from server: ', error.request)
                Alert.alert(
                    'No response received from server',
                    'Please try again later.',
                    [{ text: 'OK' }],
                )
            } else {
                console.error('Error setting up the request: ', error.message)
                Alert.alert(
                    'Error setting up the request',
                    'Please try again.',
                    [{ text: 'OK' }],
                )
            }
            throw error
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                {' '}
                // Todo: deleteit
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
                <View style={styles.selectRoleContainer}>
                    <TouchableOpacity
                        style={[
                            styles.selectRoleBtn,
                            role === 'customer' && styles.selectedRoleBtn,
                        ]}
                        onPress={() => setRole('customer')}
                    >
                        <Text style={styles.selectRoleBtnTxt}>Customer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.selectRoleBtn,
                            role === 'serviceprovider' &&
                                styles.selectedRoleBtn,
                        ]}
                        onPress={() => setRole('serviceprovider')}
                    >
                        <Text style={styles.selectRoleBtnTxt}>
                            Service Provider
                        </Text>
                    </TouchableOpacity>
                </View>
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
        // Todo: deleteit
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
    selectRoleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    selectRoleBtn: {
        marginTop: 24,
        backgroundColor: COLORS.primary,
        width: '40%',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    selectedRoleBtn: {
        backgroundColor: COLORS.accent,
    },
    selectRoleBtnTxt: {
        color: COLORS.neutralGrey,
        textAlign: 'center',
    },
})

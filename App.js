import {
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IP_ADDRESS } from './Constants.js'

const App = () => {
    const [todos, setTodos] = useState([])
    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitUserData = async () => {
        const user = {
            fullName: fullName,
            email: email,
            password: password,
            username: username,
        }

        try {
            const response = await axios.post(
                `${IP_ADDRESS}/api/v1/users/register`,
                user,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    timeout: 10000,
                }
            )

            console.log('User Registered Successfully ', response)
            return response.data
        } catch (error) {
            if (error.response) {
                console.error('Registration failed, Status: ', error.response.status, 'Response: ', error.response.data)
            } else if (error.request) {
                console.error('No response from server: ', error.request)
            } else {
                console.error('Error setting up the request: ', error.message)
            }
            throw error
        }
    }

    fetchData = async () => {
        try {
            const response = await axios.get(`${IP_ADDRESS}/api`)
            console.log(new Date().toLocaleTimeString(), ' ', response.data)
            setTodos(response.data)
        } catch (error) {
            console.error('Error fetching data: ', error)
            if (error.response) {
                console.log(
                    'Server responded with a status code:',
                    error.response.status
                )
            } else if (error.request) {
                console.log(
                    'Request was made but no response was received:',
                    error.request
                )
            } else {
                console.log('Error setting up the request:', error.message)
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.heading}>Sign up</Text>
                <TextInput
                    style={styles.fullnameInput}
                    placeholder="Full Name"
                    placeholderTextColor="#B0B0B0"
                    onChangeText={(text) => setFullName(text)}
                />
                <TextInput
                    style={styles.usernameInput}
                    placeholder="User Name"
                    placeholderTextColor="#B0B0B0"
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.emailInput}
                    placeholder="Email Address"
                    placeholderTextColor="#B0B0B0"
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.pwInput}
                    placeholder="Password"
                    placeholderTextColor="#B0B0B0"
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    style={styles.continueBtn}
                    onPress={submitUserData}
                >
                    <Text style={styles.continueBtnTxt}>Continue</Text>
                </TouchableOpacity>
                <View style={styles.loginLink}>
                    <Text style={styles.loginTxt}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.loginBtnTxt}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#121212',
        // backgroundColor: '#878276',
        backgroundColor: '#373747',
        // alignItems: 'center',
        justifyContent: 'flex-end',
    },
    subContainer: {
        // width: '94%',
        paddingLeft: 16,
        paddingRight: 16,
        // paddingTop: 16,
        paddingBottom: 28,
    },
    heading: {
        fontSize: 28,
        fontWeight: '600',
        color: '#E0E0E0',
    },
    fullnameInput: {
        marginTop: 24,
        borderBottomWidth: 1,
        borderColor: '#2C2C2C',
        fontWeight: '600',
    },
    usernameInput: {
        marginTop: 24,
        borderBottomWidth: 1,
        borderColor: '#2C2C2C',
        fontWeight: '600',
    },
    emailInput: {
        marginTop: 12,
        borderBottomWidth: 1,
        borderColor: '#2C2C2C',
        fontWeight: '600',
    },
    pwInput: {
        marginTop: 12,
        borderBottomWidth: 1,
        borderColor: '#2C2C2C',
        fontWeight: '600',
    },
    continueBtn: {
        marginTop: 24,
        backgroundColor: '#1A5319',
        padding: 12,
        alignItems: 'center',
    },
    continueBtnTxt: {
        color: '#E0E0E0',
        width: '18%', // ASK
    },

    loginLink: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginTxt: {
        color: '#E0E0E0',
        width: '48%', // ASK
    },
    loginBtnTxt: {
        color: '#4CAF50',
    },
})

import {
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Modal,
    ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { IP_ADDRESS } from '../constants/Constants'
import AddImage from '../assets/images/add-a-photo.svg'

const Signup = () => {
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)

    const submitUserData = async () => {
        const formData = new FormData()
        formData.append('fullName', fullName)
        formData.append('phoneNumber', phoneNumber)
        formData.append('email', email)
        formData.append('password', password)
        if (profileImageUrl) {
            console.log(profileImageUrl)
            formData.append('profileImageUrl', {
                uri: profileImageUrl,
                name: 'profile.jpg',
                type: 'image/jpeg',
            })
        }
        console.log(formData)

        try {
            const response = await axios.post(
                `${IP_ADDRESS}/api/v1/users/register`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Accept: 'application/json',
                    },
                    timeout: 10000,
                },
            )

            console.log('User Registered Successfully ', response.data)
            return response.data
        } catch (error) {
            if (error.response) {
                console.error(
                    'Registration failed, Status: ',
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

    fetchData = async () => {
        try {
            const response = await axios.get(`${IP_ADDRESS}/api`)
            console.log(new Date().toLocaleTimeString(), ' ', response.data)
        } catch (error) {
            console.error('Error fetching data: ', error)
            if (error.response) {
                console.log(
                    'Server responded with a status code:',
                    error.response.status,
                )
            } else if (error.request) {
                console.log(
                    'Request was made but no response was received:',
                    error.request,
                )
            } else {
                console.log('Error setting up the request:', error.message)
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const imagePickerOptions = {
        mediaType: 'photo',
        includeBase64: false,
    }

    const openCamera = () => {
        setIsModalVisible(false)
        launchCamera(imagePickerOptions, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera picker')
            } else if (response.errorCode) {
                console.log(
                    'ImagePicker Error: ',
                    response.errorCode,
                    'Error Message: ',
                    response.errorMessage,
                )
            } else {
                console.log('Photo: ', response.assets[0].uri)
                const selectedImage = response.assets[0]
                setProfileImageUrl(selectedImage.uri)
                console.log(profileImageUrl)
            }
        })
    }

    const openGallery = () => {
        setIsModalVisible(false)
        launchImageLibrary(imagePickerOptions, (response) => {
            if (response.didCancel) {
                console.log('User cancelled gallery picker')
            } else if (response.errorCode) {
                console.log(
                    'ImagePicker Error: ',
                    response.errorCode,
                    'Error Message: ',
                    response.errorMessage,
                )
            } else {
                console.log('Photo: ', response.assets[0].uri)
                const selectedImage = response.assets[0]
                setProfileImageUrl(selectedImage.uri)
                console.log(profileImageUrl)
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.heading}>Sign up</Text>
                <TouchableOpacity
                    style={styles.imagePickerBtn}
                    onPress={() => setIsModalVisible(true)}
                >
                    {profileImageUrl ? (
                        <Image
                            source={{ uri: profileImageUrl }}
                            style={styles.imagePickerBtnImg}
                            // resizeMode="cover"
                        />
                    ) : (
                        <AddImage width={40} height={40} />
                    )}
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                    // transparent={true}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.openCameraBtn}
                            onPress={openCamera}
                        >
                            <Text>Open Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.openGalleryBtn}
                            onPress={openGallery}
                        >
                            <Text>Open Gallery e</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <TextInput
                    style={styles.fullnameInput}
                    placeholder="Full Name"
                    placeholderTextColor="#B0B0B0"
                    onChangeText={(text) => setFullName(text)}
                />
                <TextInput
                    style={styles.usernameInput}
                    placeholder="Phone Number"
                    placeholderTextColor="#B0B0B0"
                    onChangeText={(text) => setPhoneNumber(text)}
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

export default Signup

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
    imagePickerBtn: {
        marginTop: 24,
        alignSelf: 'center',
        backgroundColor: '#1A5319',
        // padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
        height: '15%',
        borderRadius: 50,
        overflow: 'hidden',
    },
    imagePickerBtnImg: {
        width: '100%',
        height: '100%',
        // borderRadius: 50,
        // resizeMode:'cover',
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        paddingBottom: 24,
    },
    openCameraBtn: {
        marginTop: 24,
        backgroundColor: '#1A5319',
        padding: 12,
        alignItems: 'center',
    },
    openGalleryBtn: {
        marginTop: 24,
        backgroundColor: '#1A5319',
        padding: 12,
        alignItems: 'center',
    },
})

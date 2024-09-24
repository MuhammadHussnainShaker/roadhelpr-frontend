import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Modal,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { IP_ADDRESS } from '../constants/Constants'
import { Icons } from '../constants/icons'
import AppButton from '../components/AppButton'
import TextButton from '../components/TextButton'
import CustomTextInput from '../components/CustomTextInput'
import { COLORS } from '../constants/colors'
import { LAYOUT } from '../constants/layout'
import CustomModal from '../components/CustomModal'

const Signup = () => {
    const [fullName, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)

    const navigation = useNavigation()

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
                        <Icons.PhotoIcon width={40} height={40} />
                    )}
                </TouchableOpacity>
                <CustomModal
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View>
                        <AppButton title={'Open Camera'} onPress={openCamera} />
                        <AppButton
                            title={'Open Gallery'}
                            onPress={openGallery}
                        />
                        <AppButton
                            title={'Cancel'}
                            onPress={() => setIsModalVisible(false)}
                            backgroundColor={COLORS.error}
                        />
                    </View>
                </CustomModal>
                <CustomTextInput
                    placeholder="Full Name"
                    onChangeText={(text) => setFullName(text)}
                />
                <CustomTextInput
                    placeholder="Phone Number"
                    onChangeText={(text) => setPhoneNumber(text)}
                />
                <CustomTextInput
                    placeholder="Email Address"
                    onChangeText={(text) => setEmail(text)}
                />
                <CustomTextInput
                    placeholder="Password"
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                />

                <AppButton title="Continue" onPress={submitUserData} />

                <TouchableOpacity
                    style={styles.loginLink}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.loginTxt}>
                        Already have an account?
                    </Text>
                    <TextButton title="Login" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryBackground,
        justifyContent: 'flex-end',
    },
    subContainer: {
        paddingLeft: LAYOUT.paddingMedium,
        paddingRight: LAYOUT.paddingMedium,
    },
    heading: {
        fontSize: LAYOUT.fontSizeExtraLarge,
        color: COLORS.primary,
    },
    // fullnameInput: {
    //     marginTop: 24,
    //     borderBottomWidth: 1,
    //     borderColor: '#2C2C2C',
    //     fontWeight: '600',
    // },
    // usernameInput: {
    //     marginTop: 24,
    //     borderBottomWidth: 1,
    //     borderColor: '#2C2C2C',
    //     fontWeight: '600',
    // },
    // emailInput: {
    //     marginTop: 12,
    //     borderBottomWidth: 1,
    //     borderColor: '#2C2C2C',
    //     fontWeight: '600',
    // },
    // pwInput: {
    //     marginTop: 12,
    //     borderBottomWidth: 1,
    //     borderColor: '#2C2C2C',
    //     fontWeight: '600',
    // },
    // continueBtn: {
    //     marginTop: 24,
    //     backgroundColor: '#1A5319',
    //     padding: 12,
    //     alignItems: 'center',
    // },
    // continueBtnTxt: {
    //     color: '#E0E0E0',
    //     width: '18%', // ASK
    // },

    loginLink: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginTxt: {
        color: COLORS.textPrimary,
    },
    imagePickerBtn: {
        marginTop: LAYOUT.marginMedium,
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: '26%',
        height: '16%',
        borderRadius: LAYOUT.borderRadiusRounded,
        overflow: 'hidden',
    },
    imagePickerBtnImg: {
        width: '100%',
        height: '100%',
    },
})

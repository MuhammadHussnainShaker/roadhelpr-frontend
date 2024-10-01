import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Modal,
    Alert,
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
    const [role, setRole] = useState('customer')
    const [profileImageUrl, setProfileImageUrl] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)

    const navigation = useNavigation()

    const submitUserData = async () => {
        const formData = new FormData()
        formData.append('fullName', fullName)
        formData.append('phoneNumber', phoneNumber)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('role', role)
        if (profileImageUrl) {
            console.log(profileImageUrl)
            formData.append('profileImageUrl', {
                uri: profileImageUrl,
                name: 'profile.jpg',
                type: 'image/jpeg',
            })
        }

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

            // console.log('User Registered Successfully ', response.data)
            navigation.navigate('Login')
            return response.data
        } catch (error) {
            if (error.response) {
                console.error(
                    'Registration failed, Status: ',
                    error.response.status,
                    'Response: ',
                    error.response.data,
                )
                Alert.alert(
                    'Signup Failed',
                    'Please make sure to enter valid signup details.',
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

                <AppButton title="Continue" onPress={submitUserData} />

                <TouchableOpacity
                    style={styles.loginLink}
                    onPress={() => navigation.replace('Login')}
                >
                    <Text style={styles.loginTxt}>
                        Already have an account?
                    </Text>
                    <Text style={styles.loginBtnTxt}> Login</Text>
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
    loginLink: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginTxt: {
        color: COLORS.textPrimary,
    },
    loginBtnTxt: {
        color: COLORS.primary,
    },
    imagePickerBtn: {
        marginTop: LAYOUT.marginMedium,
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: '26%',
        height: '14.5%',
        borderRadius: LAYOUT.borderRadiusRounded,
        overflow: 'hidden',
    },
    imagePickerBtnImg: {
        width: '100%',
        height: '100%',
    },
})

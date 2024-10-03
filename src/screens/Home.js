import { View, StyleSheet } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { COLORS } from '../constants/colors'
import MapView from '../components/MapView'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import BottomSheet from '../components/BottomSheet'
import axios from 'axios'
import { IP_ADDRESS } from '../constants/Constants'
import { setRequest } from '../store/slices/requestSlice'
import PushNotification from 'react-native-push-notification'
import Payment from './Payment'
import CustomModal from '../components/CustomModal'
import { StripeProvider } from '@stripe/stripe-react-native'
import { STRIPE_PUBLISHABLE_KEY } from '../../secrets'

const Home = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isSelectingLocation, setIsSelectingLocation] = useState(false)
    const [serviceLocation, setServiceLocation] = useState([])

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handleSelectPickupLocation = useCallback(() => {
        setIsSelectingLocation((previousValue) => !previousValue)
    }, [])

    const handleUpdateServiceLocation = (location) => {
        setServiceLocation(location)
    }

    const handleConfirmServiceLocation = async () => {
        setIsModalVisible(true)
    }

    const handleConfirmPayment = async () => {
        console.log('Confrim payment handled')
        setIsModalVisible(false)

        // PushNotification.localNotification({
        //     channelId: 'service-request-channel',
        //     title: 'Service Request Made Successfully',
        //     message:
        //         'Service Request has been made. Please wait while some service provider accepts your service request',
        // })
        setIsSelectingLocation((previousValue) => !previousValue)

        const serviceRequestData = {
            longitude: serviceLocation[0],
            latitude: serviceLocation[1],
        }

        try {
            const response = await axios.post(
                `${IP_ADDRESS}/api/v1/service/create-service-request`,
                serviceRequestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    timeout: 10000,
                },
            )

            console.log(
                'Service Request made Successfully ',
                response.data.data,
            )

            dispatch(setRequest(response.data.data))

            navigation.navigate('Requests')

            return response.data
        } catch (error) {
            if (error.response) {
                console.error(
                    'Service request failed, Status: ',
                    error.response.status,
                    'Response: ',
                    error.response.data,
                )
                Alert.alert('Service request failed', [{ text: 'OK' }])
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
        <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
            <View style={styles.container}>
                <MapView
                    isSelectingLocation={isSelectingLocation}
                    handleSelectPickupLocation={handleSelectPickupLocation}
                    serviceLocation={serviceLocation}
                    handleUpdateServiceLocation={handleUpdateServiceLocation}
                    handleConfirmServiceLocation={handleConfirmServiceLocation}
                />
                <BottomSheet
                    isSelectingLocation={isSelectingLocation}
                    handleSelectPickupLocation={handleSelectPickupLocation}
                    serviceLocation={serviceLocation}
                    handleConfirmServiceLocation={handleConfirmServiceLocation}
                />
                <CustomModal
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <Payment handleConfirmPayment={handleConfirmPayment} />
                </CustomModal>
            </View>
        </StripeProvider>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryBackground,
        justifyContent: 'flex-end',
    },
})

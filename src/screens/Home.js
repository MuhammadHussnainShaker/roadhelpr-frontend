import { View, StyleSheet } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { COLORS } from '../constants/colors'
import MapView from '../components/MapView'
import AppButton from '../components/AppButton'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import BottomSheet from '../components/BottomSheet'
import axios from 'axios'
import { IP_ADDRESS } from '../constants/Constants'

const Home = () => {
    const [isSelectingLocation, setIsSelectingLocation] = useState(false)
    const [serviceLocation, setServiceLocation] = useState(null)

    const handleSelectPickupLocation = useCallback(() => {
        setIsSelectingLocation((previousValue) => !previousValue)
    }, [])

    const handleUpdateServiceLocation = (location) => {
        setServiceLocation(location)
    }

    const handleConfirmServiceLocation = async () => {
        setIsSelectingLocation((previousValue) => !previousValue)

        const serviceRequestData = {
            longitude: serviceLocation[0],
            latitude: serviceLocation[1],
        }

        // send service request data to backend
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

            // console.log('User Logged In Successfully ', response.data.data)

            // navigation.replace('Main')

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
        </View>
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

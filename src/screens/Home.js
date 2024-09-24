import { View, StyleSheet } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { COLORS } from '../constants/colors'
import MapView from '../components/MapView'
import AppButton from '../components/AppButton'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import BottomSheet from '../components/BottomSheet'

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isSelectingLocation, setIsSelectingLocation] = useState(false)

    const accessToken = useSelector((state) => state.auth?.accessTokeni)

    const handlePickupLocation = useCallback(() => {
        setIsSelectingLocation((previousValue) => !previousValue)
    }, [])

    const navigation = useNavigation()

    useEffect(() => {
        if (accessToken) {
            setIsLoggedIn(true)
            console.log('isLoggedIn: ', isLoggedIn)
        } else {
            setIsLoggedIn(false)
        }
    }, [accessToken])

    return (
        <View style={styles.container}>
            {!isLoggedIn && (
                <View style={styles.loginBtn}>
                    <AppButton
                        title={'Login'}
                        onPress={() => navigation.navigate('Login')}
                    />
                </View>
            )}
            <MapView
                isSelectingLocation={isSelectingLocation}
                handlePickupLocation={handlePickupLocation}
            />
            <BottomSheet
                isSelectingLocation={isSelectingLocation}
                handlePickupLocation={handlePickupLocation}
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
    loginBtn: {
        position: 'absolute',
        zIndex: 1,
        top: '-1%',
        left: '70%',
        width: '25%',
    },
})

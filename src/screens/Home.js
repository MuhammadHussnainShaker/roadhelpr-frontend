import { View, StyleSheet } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { COLORS } from '../constants/colors'
import MapView from '../components/MapView'
import AppButton from '../components/AppButton'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import BottomSheet from '../components/BottomSheet'

const Home = () => {
    const [isSelectingLocation, setIsSelectingLocation] = useState(false)

    const handleSelectPickupLocation = useCallback(() => {
        setIsSelectingLocation((previousValue) => !previousValue)
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                isSelectingLocation={isSelectingLocation}
                handleSelectPickupLocation={handleSelectPickupLocation}
            />
            <BottomSheet
                isSelectingLocation={isSelectingLocation}
                handleSelectPickupLocation={handleSelectPickupLocation}
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

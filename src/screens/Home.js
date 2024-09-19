import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FONTFAMILY } from '../constants/fontfamily'
import { COLORS } from '../constants/colors'
import { Icons } from '../constants/icons'
import MapScreen from '../components/MapScreen'

const Home = () => {
    return (
        <View style={styles.container}>
            <MapScreen />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryBackground,
    },
    classicText: {
        fontFamily: FONTFAMILY.firaLight,
        color: '#000000',
    },
})

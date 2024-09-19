import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import Mapbox from '@rnmapbox/maps'
import { ButtonGroup } from '@rneui/base'
import { FONTFAMILY } from '../constants/fontfamily'
import { COLORS } from '../constants/colors'
import { Icons } from '../constants/icons'

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.classicText}>Home</Text>
            <Text style={styles.classicText}>Home</Text>
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

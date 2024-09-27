import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/colors'
import { LAYOUT } from '../constants/layout'
import AppButton from '../components/AppButton'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { removeTokens } from '../store/slices/authSlice'

const Settings = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleLogout = () => {
        dispatch(removeTokens())
        navigation.replace('Login')
    }
    return (
        <View style={styles.container}>
            <AppButton title="Logout" onPress={handleLogout} />
        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primaryBackground,
        flex: 1,
        paddingLeft: LAYOUT.paddingSmall,
        paddingRight: LAYOUT.paddingSmall,
    },
})

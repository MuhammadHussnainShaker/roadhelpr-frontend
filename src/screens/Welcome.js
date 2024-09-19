import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AppButton from '../components/AppButton'
import { COLORS } from '../constants/colors'
import { LAYOUT } from '../constants/layout'
import { Icons } from '../constants/icons'

const Welcome = () => {
    const navigation = useNavigation()

    const goToSignup = () => {
        navigation.navigate('Signup')
    }

    const goToLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Icons.Logo width={250} height={250} />
            </View>
            <AppButton title="Signup" onPress={goToSignup} />
            <AppButton title="Login" onPress={goToLogin} />
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primaryBackground,
        flex: 1,
        justifyContent: 'center',
        paddingLeft: LAYOUT.paddingSmall,
        paddingRight: LAYOUT.paddingSmall,
    },
    logo: {
        alignSelf: 'center',
        marginBottom: LAYOUT.marginLarge,
    },
})

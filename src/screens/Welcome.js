import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {
    const navigation = useNavigation()

    const goToSignup = () => {
        navigation.navigate('Signup')
    }

    const goToLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <View>
            <Text>Welcome</Text>
            <TouchableOpacity style={styles.continueBtn} onPress={goToSignup}>
                <Text style={styles.continueBtnTxt}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueBtn} onPress={goToLogin}>
                <Text style={styles.continueBtnTxt}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    continueBtn: {
        marginTop: 24,
        backgroundColor: '#1A5319',
        padding: 12,
        alignItems: 'center',
    },
    continueBtnTxt: {
        color: '#E0E0E0',
        width: '18%',
    },
})

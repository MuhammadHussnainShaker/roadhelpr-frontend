import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Login = () => {
    return (
        <View>
            <TouchableOpacity style={styles.continueBtn}>
                <Text style={styles.continueBtnTxt}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login

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

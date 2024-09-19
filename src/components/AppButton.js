import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/colors'

const AppButton = ({ title, onPress, backgroundColor }) => {
    return (
        <TouchableOpacity
            style={[
                styles.btn,
                backgroundColor && { backgroundColor: backgroundColor },
            ]}
            onPress={onPress}
        >
            <Text style={styles.btnTxt}>{title}</Text>
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({
    btn: {
        marginTop: 24,
        backgroundColor: COLORS.primary,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    btnTxt: {
        color: '#E0E0E0',
        textAlign: 'center',
    },
})

/*
<AppButton title="Continue" onPress={() => console.log('Pressed')}  />
*/

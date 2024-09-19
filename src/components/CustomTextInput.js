import { StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/colors'

const CustomTextInput = ({ placeholder, onChangeText }) => {
    return (
        <TextInput
            style={styles.emailInput}
            placeholder={placeholder}
            placeholderTextColor="#B0B0B0"
            onChangeText={onChangeText}
        />
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    emailInput: {
        marginTop: 12,
        borderBottomWidth: 1,
        borderColor: '#2C2C2C',
        fontWeight: '600',
        color: COLORS.inputText,
    },
})

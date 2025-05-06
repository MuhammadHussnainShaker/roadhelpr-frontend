import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/colors'

const TextButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.btnTxt}>{title}</Text>
        </TouchableOpacity>
    )
}

export default TextButton

const styles = StyleSheet.create({
    btnTxt: {
        color: COLORS.primary,
    },
})

/*
<TextButton title="Continue" onPress={() => console.log('Pressed')}  />
*/

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CustomHeader = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // margin: 8,
        // justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
    },
})

export default CustomHeader

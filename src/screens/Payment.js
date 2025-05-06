import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useStripe } from '@stripe/stripe-react-native'

const Payment = ({ handleConfirmPayment }) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe()

    const confirmHandler = () => {
        handleConfirmPayment()
    }

    const initializePaymentSheet = async () => {
        const { error } = await initPaymentSheet({
            merchantDisplayName: 'Example, Inc.',
            intentConfiguration: {
                mode: {
                    amount: 1099,
                    currencyCode: 'USD',
                },
                confirmHandler: confirmHandler,
            },
        })
    }

    const openPaymentSheet = async () => {
        await initializePaymentSheet()

        const { error } = await presentPaymentSheet()

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message)
        } else {
            setSuccess(true)
        }
    }

    useEffect(() => {
        openPaymentSheet()
    }, [])

    return <View></View>
}

export default Payment

const styles = StyleSheet.create({})

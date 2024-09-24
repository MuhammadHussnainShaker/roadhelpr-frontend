import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import AppButton from './AppButton'
import { LAYOUT } from '../constants/layout'
import { COLORS } from '../constants/colors'

const BottomSheet = ({ isSelectingLocation, handlePickupLocation }) => {
    const bottomSheetModalRef = useRef(null)

    const snapPoints = useMemo(() => ['8%', '100%'], [])

    useEffect(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    return (
        <BottomSheetModalProvider>
            <View>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={false}
                    containerHeight={40}
                    contentHeight={40}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        {!isSelectingLocation ? (
                            <>
                                <Text style={styles.text}>Services</Text>
                                <AppButton
                                    title={'Puncture Fix'}
                                    onPress={handlePickupLocation}
                                />
                            </>
                        ) : (
                            <>
                                <Text style={styles.text}>Pickup Location</Text>
                                <Text style={styles.description}>
                                    Move pin to set the location
                                </Text>
                                <AppButton
                                    title={'Confirm Pickup Location'}
                                    // onPress={handlePickLocation}
                                />
                                <AppButton
                                    title={'Cancel'}
                                    onPress={handlePickupLocation}
                                    backgroundColor={COLORS.error}
                                />
                            </>
                        )}
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingLeft: LAYOUT.paddingMedium,
        paddingRight: LAYOUT.paddingMedium,
        paddingBottom: LAYOUT.paddingMedium,
    },
    text: {
        fontSize: LAYOUT.fontSizeLarge,
        color: COLORS.textPrimary,
    },
    description: {
        fontSize: LAYOUT.fontSizeSmall,
        color: COLORS.textSecondary,
    },
})

export default BottomSheet

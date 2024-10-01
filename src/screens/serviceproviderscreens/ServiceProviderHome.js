import {
    ActivityIndicator,
    Alert,
    FlatList,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../constants/colors'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import AppButton from '../../components/AppButton'
import { LAYOUT } from '../../constants/layout'
import { Icons } from '../../constants/icons'

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Service',
        service: 'punnturefix',
        distance: '10km',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        service: 'punnturefix',
        distance: '13km',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        service: 'punnturefix',
        distance: '15km',
    },
]

const ServiceProviderHome = () => {
    const [hasLocationPermission, setHasLocationPermission] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedId, setSelectedId] = useState()

    const checkPermission = async () => {
        const permission =
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION

        const result = await check(permission)

        if (result === RESULTS.DENIED) {
            // why we simple did not compare result with 'denied' string
            // coz if library changes the underlying implementation code will still work
            const requestResult = await request(permission)
            setHasLocationPermission(requestResult === RESULTS.GRANTED)
        } else {
            setHasLocationPermission(result === RESULTS.GRANTED)
        }

        setLoading(false)
    }

    useEffect(() => {
        checkPermission()
    }, [])

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        )
    }

    if (!hasLocationPermission) {
        return (
            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: LAYOUT.fontSizeLarge,
                        color: COLORS.error,
                    }}
                >
                    Please enable location permissions from settings
                </Text>
                <AppButton
                    title="Open Settings"
                    onPress={() => Linking.openSettings()}
                />
                <AppButton title="Refresh" onPress={checkPermission} />
            </View>
        )
    }

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.item, { backgroundColor }]}
        >
            <View style={styles.listItemContainer}>
                <View>
                    <Text style={[styles.title, { color: textColor }]}>
                        Service:{' '}
                        {item.service === 'punnturefix' ? 'Punnture Fix' : null}
                    </Text>
                    <Text style={[styles.title, { color: textColor }]}>
                        Distance: {item.distance}
                    </Text>
                </View>
                <View style={styles.sendIconContainer}>
                    <Icons.SendIcon width={30} height={30} />
                </View>
            </View>
        </TouchableOpacity>
    )

    const renderItem = ({ item }) => {
        const backgroundColor =
            item.id === selectedId ? COLORS.accent : COLORS.primary
        const color = item.id === selectedId ? 'white' : 'white'

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        )
    }

    if (false) {
        return (
            <View style={[styles.container, { justifyContent: 'flex-start' }]}>
                <Text
                    style={{
                        fontSize: LAYOUT.fontSizeLarge,
                        color: COLORS.primary,
                    }}
                >
                    No incoming requests found. Looking for new requests...
                </Text>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        )
    } else {
        return (
            <View
                style={[
                    styles.container,
                    {
                        justifyContent: 'flex-start',
                    },
                ]}
            >
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selectedId}
                />
            </View>
        )
    }
}

export default ServiceProviderHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.primaryBackground,
        paddingTop: LAYOUT.paddingSmall,
        paddingLeft: LAYOUT.paddingMedium,
        paddingRight: LAYOUT.paddingMedium,
        paddingBottom: LAYOUT.paddingLarge,
    },
    item: {
        padding: 20,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 8,
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sendIconContainer: {
        backgroundColor: COLORS.primaryBackground,
        borderRadius: 50,
        padding: 10,
    },
    title: {
        fontSize: LAYOUT.fontSizeMedium,
    },
})

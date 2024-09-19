import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import MapboxGL from '@rnmapbox/maps'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'

MapboxGL.setAccessToken(
    'pk.eyJ1IjoibXVoYW1tYWRodXNzbmFpbnNoYWtlciIsImEiOiJjbTE4dm50YmoxM3d6MmpzOGo3M293enRzIn0.Fa4g2b1_HiklPF4shDnmpQ',
)

const MapScreen = () => {
    const [userLocation, setUserLocation] = useState(null)
    const [hasLocationPermission, setHasLocationPermission] = useState(false)
    const [loading, setLoading] = useState(true)

    const onUserLocationUpdate = (location) => {
        setUserLocation(location.coords)
    }

    useEffect(() => {
        MapboxGL.setTelemetryEnabled(false)

        const checkPermission = async () => {
            const permission =
                Platform.OS === 'ios'
                    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION

            const result = await check(permission)

            if (result === RESULTS.DENIED) {
                // Request permission if denied
                const requestResult = await request(permission)
                setHasLocationPermission(requestResult === RESULTS.GRANTED)
            } else {
                setHasLocationPermission(result === RESULTS.GRANTED)
            }

            setLoading(false)
        }

        checkPermission()
    }, [])

    if (loading) {
        // Show a loading indicator while checking permissions
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    if (!hasLocationPermission) {
        Alert.alert(
            'Location Permission Required',
            'Please enable location permissions to use the map.',
            [{ text: 'OK' }],
        )
        return null
    }

    const defaultCamera = {
        centerCoordinate: [12.338, 45.4385],
        zoomLevel: 17.4,
    }

    return (
        <View style={styles.container}>
            <MapboxGL.MapView style={styles.map}>
                <MapboxGL.Camera
                    // zoomLevel={10}
                    // defaultSettings={defaultCamera}
                    followUserLocation={true}
                    followZoomLevel={14.4}
                    // centerCoordinate={
                    //     userLocation
                    //         ? [userLocation.longitude, userLocation.latitude]
                    //         : [-122.4194, 37.7749]
                    // }
                />
                <MapboxGL.UserLocation
                    onUpdate={onUserLocationUpdate}
                    visible={true}
                />
                <MapboxGL.PointAnnotation
                    id="service-location"
                    coordinate={[-122.4194, 37.7749]} // Example coordinate
                >
                    <View style={styles.marker} />
                </MapboxGL.PointAnnotation>
            </MapboxGL.MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    marker: {
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 15,
    },
})

export default MapScreen

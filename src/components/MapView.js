import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import MapboxGL from '@rnmapbox/maps'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { COLORS } from '../constants/colors'

MapboxGL.setAccessToken(
    'pk.eyJ1IjoibXVoYW1tYWRodXNzbmFpbnNoYWtlciIsImEiOiJjbTE4dm50YmoxM3d6MmpzOGo3M293enRzIn0.Fa4g2b1_HiklPF4shDnmpQ',
)

const MapView = () => {
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
                // why we simple did not compare result with 'denied' string
                // coz if library changes the underlying implementation code will still work
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
                <ActivityIndicator size="large" color={COLORS.primary} />
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
        centerCoordinate: userLocation
            ? [userLocation.longitude, userLocation.latitude]
            : [69.3451, 30.3753],
        zoomLevel: 10,
    }

    return (
        <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
                defaultSettings={defaultCamera}
                followUserLocation={true}
                followZoomLevel={14.4}
            />
            <MapboxGL.UserLocation
                onUpdate={onUserLocationUpdate}
                visible={true}
                minDisplacement={3} // min distance in meters between updates
                showsUserHeadingIndicator={true}
                androidRenderMode="gps"
            />
            {/* <MapboxGL.PointAnnotation // adds marker on specified location
                    id="service-location"
                    coordinate={
                        userLocation
                            ? [userLocation.longitude, userLocation.latitude]
                            : [69.3451, 30.3753]
                    }
                >
                    <View style={styles.marker} />
                </MapboxGL.PointAnnotation> */}
        </MapboxGL.MapView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1,
    },
    map: {
        flex: 1,
        zIndex: 0,
    },
    marker: {
        backgroundColor: 'red',
        width: 1,
        height: 25,
    },
})

export default MapView

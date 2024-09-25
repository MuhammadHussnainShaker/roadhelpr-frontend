import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import MapboxGL from '@rnmapbox/maps'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { COLORS } from '../constants/colors'
import { Icons } from '../constants/icons'

MapboxGL.setAccessToken(
    'pk.eyJ1IjoibXVoYW1tYWRodXNzbmFpbnNoYWtlciIsImEiOiJjbTE4dm50YmoxM3d6MmpzOGo3M293enRzIn0.Fa4g2b1_HiklPF4shDnmpQ',
)

const MapView = ({ isSelectingLocation, handleSelectPickupLocation }) => {
    const [userLocation, setUserLocation] = useState(null)
    const [hasLocationPermission, setHasLocationPermission] = useState(false)
    const [loading, setLoading] = useState(true)
    const [pinLocation, setPinLocation] = useState([69.3451, 30.3753])

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

    const onUserLocationUpdate = (location) => {
        setUserLocation(location.coords)
    }

    const handleMapPress = (e) => {
        const newCoords = e.geometry.coordinates
        if (isSelectingLocation) {
            setPinLocation(newCoords)
        }
    }

    const handleUserLocationPress = () => {
        if (isSelectingLocation) {
            setPinLocation([userLocation.longitude, userLocation.latitude]) // working
        }
    }

    const defaultCamera = {
        centerCoordinate: userLocation
            ? [userLocation.longitude, userLocation.latitude]
            : [69.3451, 30.3753],
        zoomLevel: 3,
    }

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

    return (
        <MapboxGL.MapView style={styles.map} onPress={handleMapPress}>
            <MapboxGL.Camera
                defaultSettings={defaultCamera}
                followUserLocation={true}
                followZoomLevel={14.4}
            />
            <MapboxGL.UserLocation
                onUpdate={onUserLocationUpdate}
                onPress
                visible={true}
                minDisplacement={3} // min distance in meters between updates
                showsUserHeadingIndicator={true}
                androidRenderMode="gps"
            />
            {isSelectingLocation && (
                <MapboxGL.PointAnnotation
                    id="draggablePin"
                    coordinate={pinLocation}
                    draggable={true}
                    onDragEnd={(e) => {
                        const newCoords = e.geometry.coordinates
                        setPinLocation(newCoords)
                    }}
                />
            )}
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
})

export default MapView

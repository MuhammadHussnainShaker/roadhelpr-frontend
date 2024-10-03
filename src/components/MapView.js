import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native'
import MapboxGL from '@rnmapbox/maps'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { COLORS } from '../constants/colors'
import { Icons } from '../constants/icons'
import AppButton from './AppButton'

MapboxGL.setAccessToken(
    'pk.eyJ1IjoibXVoYW1tYWRodXNzbmFpbnNoYWtlciIsImEiOiJjbTE4dm50YmoxM3d6MmpzOGo3M293enRzIn0.Fa4g2b1_HiklPF4shDnmpQ',
)

const MapView = ({
    isSelectingLocation,
    handleSelectPickupLocation,
    serviceLocation,
    handleUpdateServiceLocation,
    handleConfirmServiceLocation,
}) => {
    const [hasLocationPermission, setHasLocationPermission] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userLocation, setUserLocation] = useState(null)
    const [pinLocation, setPinLocation] = useState([69.3451, 30.3753])
    const [followUserLocation, setFollowUserLocation] = useState(true)

    const mapCameraRef = useRef(null)

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

        const falseFollowUserLocationTimeoutId = setTimeout(() => {
            setFollowUserLocation(false)
        }, 7000)

        return () => {
            clearTimeout(falseFollowUserLocationTimeoutId)
        }
    }, [])

    const onUserLocationUpdate = (location) => {
        setUserLocation(location.coords)
    }

    const handleMapPress = (e) => {
        const newCoords = e.geometry.coordinates
        if (isSelectingLocation) {
            setPinLocation(newCoords)
            handleUpdateServiceLocation(newCoords)
        }
    }

    const handleUserLocationPress = () => {
        if (isSelectingLocation) {
            setPinLocation([userLocation.longitude, userLocation.latitude])
            handleUpdateServiceLocation([
                userLocation.longitude,
                userLocation.latitude,
            ])
        }
    }

    const centerToUserLocation = () => {
        mapCameraRef?.current.setCamera({
            centerCoordinate: [userLocation.longitude, userLocation.latitude],
            zoomLevel: 14.4,
            animationDuration: 1000,
        })
    }

    const defaultCamera = {
        centerCoordinate: userLocation
            ? [userLocation.longitude, userLocation.latitude]
            : [69.3451, 30.3753],
        zoomLevel: userLocation ? 14.4 : 3,
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
        <View style={styles.container}>
            <MapboxGL.MapView style={styles.map} onPress={handleMapPress}>
                <MapboxGL.Camera
                    defaultSettings={defaultCamera}
                    followUserLocation={followUserLocation}
                    followZoomLevel={14.4}
                    ref={mapCameraRef}
                    animationMode="none"
                />
                <MapboxGL.UserLocation
                    onUpdate={onUserLocationUpdate}
                    onPress={handleUserLocationPress}
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
                            handleUpdateServiceLocation(newCoords)
                        }}
                    />
                )}
            </MapboxGL.MapView>
            <View
                style={[
                    styles.myLocationBtn,
                    isSelectingLocation && { top: '61.5%' },
                ]}
            >
                <AppButton onPress={centerToUserLocation}>
                    <Icons.MyLocationIcon width={25} height={25} />
                </AppButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 0,
    },
    map: {
        flex: 1,
    },
    myLocationBtn: {
        position: 'absolute',
        zIndex: 1,
        top: '72%',
        left: '85%',
        width: '13%',
    },
})

export default MapView

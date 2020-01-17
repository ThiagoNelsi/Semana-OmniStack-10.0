import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

function Main({ navigation }) {

    const [currentRegion, setCurrentRegion] = useState(null)

    useEffect(() => {

        async function loadInitalPosition() {

            const { granted } = await requestPermissionsAsync()

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                })
                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                })
            }


        }

        loadInitalPosition()
    }, [])

    if (!currentRegion) {
        return null
    }

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{latitude: currentRegion.latitude, longitude: currentRegion.longitude}}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/52456089?s=460&v=4' }} />
            
                <Callout>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Thiago Nelsi do Couto</Text>
                        <Text style={styles.devBio}>Computer student at "IFSULDEMINAS Campus Inconfidentes" and a super technology lover! desktop_computer</Text>
                        <Text style={styles.devTechs}>Node.js, ReactJS, React Native, Python, C</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    )


}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#7d40e7'
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    }
})

export default Main
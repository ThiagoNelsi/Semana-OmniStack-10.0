import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView  } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

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
        <>
            <MapView initialRegion={currentRegion} style={styles.map}>
                <Marker coordinate={{latitude: currentRegion.latitude, longitude: currentRegion.longitude}}>
                    <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/52456089?s=460&v=4' }} />
                
                    <Callout onPress={() => {
                        navigation.navigate('Profile', { github_username: 'ThiagoNelsi' })
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>Thiago Nelsi do Couto</Text>
                            <Text style={styles.devBio}>Computer student at "IFSULDEMINAS Campus Inconfidentes" and a super technology lover! desktop_computer</Text>
                            <Text style={styles.devTechs}>Node.js, ReactJS, React Native, Python, C</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <KeyboardAvoidingView  style={styles.searchForm} behavior='padding' keyboardVerticalOffset={85}>

                <TextInput
                    style = {styles.searchInput}  
                    placeholder = 'Buscar devs por techs'
                    placeholderTextColor = '#999'  
                    autoCapitalize = 'none'         
                    autoCorrect = { false } 
                />

                <TouchableOpacity style={styles.searchButton} onPress={() => {}}>
                    <MaterialIcons name='my-location' size={20} color='#fff' />
                </TouchableOpacity>
            
            </KeyboardAvoidingView >
        </>
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
    },
    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    searchButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})

export default Main
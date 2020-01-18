import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { WebView } from 'react-native-webview'

function Profile({ navigation }) {

    const github_username = navigation.getParam('github_username')

    return <WebView source={{ uri: `https://github.com/${github_username}` }} style={{ flex: 1 }} />
}

const styles = StyleSheet.create({
    v: {
        flex: 1
    },
    user: {
        fontSize: 30
    }
})

export default Profile
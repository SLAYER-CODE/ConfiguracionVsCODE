import React from 'react'
import { Text,SafeAreaView } from 'react-native'
// import {  } from 'react-native-safe-area-context'
import { styles } from '../../Stylos/Styles'

function AgregateTab() {
    return (
        <SafeAreaView style={[styles.containerAbsolute, { backgroundColor: '#004B63' }]}>
            <Text>
                Perfil
            </Text>
        </SafeAreaView>
    )
}

export default AgregateTab

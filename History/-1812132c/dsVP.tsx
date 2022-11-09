import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { styles } from '../Stylos/Styles'

function Configuracion() {
    return (
        <SafeAreaView style={[styles.containerAbsolute, { backgroundColor: '#004B63' }]}>
            <Text>
                Perfil
            </Text>
        </SafeAreaView>
    )
}

export default Configuracion

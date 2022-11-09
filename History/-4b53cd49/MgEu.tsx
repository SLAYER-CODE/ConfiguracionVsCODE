import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { View } from 'react-native-animatable'
import { styles } from '../Stylos/Styles'

function CarritoDeCompras() {
    return (
        <SafeAreaView style={[styles.containerAbsolute, { backgroundColor: '#004B63' }]}>
            <Text>
                Perfil
            </Text>
        </SafeAreaView>
    )
}

export default CarritoDeCompras

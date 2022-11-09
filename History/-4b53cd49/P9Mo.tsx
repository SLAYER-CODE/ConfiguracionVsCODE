import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import { View } from 'react-native-animatable'
import { styles } from '../Stylos/Styles'

function CarritoDeCompras() {
    return (
        <SafeAreaView style={[styles.containerAbsolute, { backgroundColor: '#ff9900' }]}>
            <Text>
                Perfil
            </Text>
        </SafeAreaView>
    )
}

export default CarritoDeCompras

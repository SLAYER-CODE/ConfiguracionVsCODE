import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { ScrollView } from 'react-native'
import { styles } from '../Stylos/Styles'
// import Preview from './Preview'

function Categorias() {
    return (
        <View style={{ flex: 1 }}>
          <ScrollView>
            {Array(200)
              .fill()
              .map((_, i) => {
                return <Text>{i}</Text>;
              })}
          </ScrollView>
        </View>
      );
}

export default Categorias

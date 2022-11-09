import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { ScrollView } from 'react-native'
import { styles } from '../Stylos/Styles'
// import Preview from './Preview'

function Categorias() {
    return (
        <SafeAreaView style={[styles.containerAbsolute, {padding:20, backgroundColor: '#ff9900'}]}>
            <ScrollView horizontal={false} scrollEnabled={true} style={{width:"100%",flex:1,flexDirection:'column'}}>
            <View style={{padding:20,height:150,backgroundColor:'green',margin:10,borderRadius:10,borderTopColor:"#000",borderWidth:2,borderStyle:"dashed"}}>
                <Text>Medicina</Text>
            </View>
            <View style={{padding:20,width:"100%",height:150,backgroundColor:'green',margin:10}}>
                <Text>Medicina</Text>
            </View>
            <View style={{padding:20,width:"100%",height:150,backgroundColor:'green',margin:10}}>
                <Text>Medicina</Text>
            </View>
            <View style={{padding:20,width:"100%",height:150,backgroundColor:'green',margin:10}}>
                <Text>Medicina</Text>
            </View>
            <View style={{padding:20,width:"100%",height:150,backgroundColor:'green',margin:10}}>
                <Text>Medicina</Text>
            </View>
            <View style={{padding:20,width:"100%",height:150,backgroundColor:'green',margin:10}}>
                <Text>Medicina</Text>
            </View>
            <View style={{padding:20,width:"100%",height:150,backgroundColor:'green',margin:10}}>
                <Text>Medicina</Text>
            </View>
            <View style={{padding:20,width:"100%",height:150,backgroundColor:'green',margin:10}}>
                <Text>Medicina</Text>
            </View>
      
            </ScrollView>
        </SafeAreaView>
    )
}

export default Categorias

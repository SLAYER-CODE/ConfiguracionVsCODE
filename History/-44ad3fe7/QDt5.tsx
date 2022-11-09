import React, { Fragment, } from 'react'
import { Text, Image, View, StyleSheet, TouchableHighlight, ImageSourcePropType, StatusBar } from 'react-native'
import { } from 'react-native-animatable'
import { } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';

// import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../TypeDefinitios/DefinitiosNavigateMain'
import { styles } from '../Stylos/Styles';

import SafeAreaView from 'react-native-safe-area-view';
import { BlurView } from '@react-native-community/blur';
import { storagemkv } from '../../App';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { MMKV } from 'react-native-mmkv'

type OptionsPressSreen = {
    Imagen: ImageSourcePropType,
    Callnavigation: (keyof RootStackParamList),
    Description: string,
    position: [number, number]
    PositionLogo: [number, number]
    deletetask?: boolean
}

const slides = {
    Cosas: require('./ImagenPress/Cosas.png'),
    Comp: require('./ImagenPress/Comp.png'),
    Merca: require('./ImagenPress/Merca.png'),
}

type InitNavigationDelete = NativeStackNavigationProp<RootStackParamList, 'Main'>
type ProfileScreenHomeNavigation = NativeStackNavigationProp<RootStackParamList, 'PresOne'>;

function Precentaciones({ position, PositionLogo, Imagen, Callnavigation, Description,deletetask }: OptionsPressSreen): JSX.Element {
    // const storage = new MMKV()

    const navSub = useNavigation<ProfileScreenHomeNavigation>();
    const DeleteStack = useNavigation<InitNavigationDelete>();
    const styles = StyleSheet.create({
        container: {
          justifyContent: "center",
          alignItems: "center"
        },
        absolute: {
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }
      });
    return (

        <SafeAreaView style={[styles.container, { backgroundColor: '#fcba03' }]}>
            <StatusBar translucent={true} barStyle={'light-content'} backgroundColor={'#fcba0380'} />

            <View>
                <View>
                    <Image style={{ position: 'absolute', width: 200, height: 200, top: PositionLogo[0], left: PositionLogo[1], zIndex: 0 }} blurRadius={2} source={require('../Dranwable/TabsDraws/Icon/MyLogo.png')} />
                </View>
                <View style={{ flex: 1, position: 'absolute', zIndex: 3, width: 200, height: 200, top: '70%', left: '80%' }}>

                    <RadialGradient style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }} colors={['aqua', '#182B3740', 'transparent']}
                        stops={[0.1, 0.4, 0.3, 0.4]}
                        center={[100, 100]}
                        radius={110}>

                        <TouchableHighlight style={{ width: 100, height: 100, borderRadius: 200 }} activeOpacity={0.2} underlayColor="#182B3730" onPress={() => {
                            if(Callnavigation=='Main'){
                                storagemkv.set('presentations', true)
                                // const storeData = async (value) => {
                                //     try {
                                //       await AsyncStorage.setItem('@storage_Key', value)
                                //     } catch (e) {
                                //       console.log("Ubo un error de almacenamiento!")
                                //     }
                                //   }
                                // storeData("presentation")
                            }

                            deletetask? DeleteStack.reset({index:0,routes:[{name:'Main'}]})  :
                            navSub.navigate(Callnavigation)
                        }}>
                            <View style={{ flex: 1, flexDirection: 'row', right: 10 }}>

                                <Icon style={{ position: 'absolute', left: 20 }} name={'arrow-right'} size={100} color='black' />
                                <Icon name={'arrow-right'} size={100} color='black' />

                            </View>

                        </TouchableHighlight>
                    </RadialGradient>

                </View>

                <View style={{ zIndex: 1, flex: 1, position: 'absolute', justifyContent: 'center', alignItems: 'center', top: position[0], left: position[1], borderRadius: 10 }}>
                    {/* <BlurView blurRadius={25} /> */}
                    <RadialGradient style={{ zIndex: 0, height: 250, width: 300 }} radius={90} center={[100, 100]} stops={[0.3, 0.4, 0.5, 0.6]} colors={['#fcba0333', '#fcba0333', '#fcba0333', "transparent"]}  >
                        <Text style={{ fontSize: 26, fontFamily: 'Microsoft Yi Baiti', fontWeight: '100', color: 'white', zIndex: 3, textShadowRadius: 20, textShadowColor: '#f06c6c', textShadowOffset: { width: 1, height: 1 } }}>
                            {Description}
                        </Text>
                    </RadialGradient>

                </View>
                <Image style={{ width: 700, height: '100%', zIndex: 0 }} blurRadius={8} source={Imagen} />

            </View>
        </SafeAreaView >
    )
}


export function PresScreenOne(): JSX.Element {
    return (
        <Precentaciones PositionLogo={[150, 180]} position={[100, 150]} Imagen={slides.Cosas} Callnavigation={'PresTwo'} Description={'Posiciona el documento \n con lo que ati mas que \n ati mas te Gusta\n'} ></Precentaciones>
    )

}

export function PressScreenTwo(): JSX.Element {
    return (
        <Precentaciones PositionLogo={[650, 123]} position={[400, 280]} Imagen={slides.Comp} Callnavigation={'PresTree'} Description={'Estudia de la forma  \n Mas educativa Posible \n e innova el mercado de la virtualización \n desde tu casa'} ></Precentaciones>

    )
}

export function PresScrennTree(): JSX.Element {
    return (
        <Precentaciones PositionLogo={[235, 380]} position={[200, 150]} Imagen={slides.Merca} deletetask Callnavigation={'Main'} Description={'Automatiza promueve tus productos, \n "se tu propio jefe con  \n DWS"'} ></Precentaciones>
    )
}

export default Precentaciones

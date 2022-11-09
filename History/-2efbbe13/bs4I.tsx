import React, { Component } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'rn-material-ui-textfield';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import OTPInputView from 'react-native-otp-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../../../Stylos/Styles';
import MapboxGL from '@rnmapbox/maps';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClientsUbication, HomeUbication } from '../../../../TypeDefinitios/DefinitiosNavigateMain';
import { Get_Producto_Products_gps_relation, Get_PRoducto_Profile_USers_ProductsProfile_products_contrate, Get_PRoducto_Profile_USers_ProductsProfile_products_contrate_gps_id } from '../../../../GraphQl/Types';
export type ClientLocationProps = {
    Locations: Get_PRoducto_Profile_USers_ProductsProfile_products_contrate[];
};

type Props = NativeStackScreenProps<
    ClientsUbication,
    'Location'>;

export function ClienteLocation({ route, navigation }: Props) {
    const locations = route.params.Locations

    console.log("######################################################################################################################################################")

    console.log(locations)
    const styler = StyleSheet.create({
        page: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF'
        },
        container: {
            height: 600,
            width: 300,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red'
        },
        map: {
            width: 410,
            flex: 1
        }
    });
    const stylera = StyleSheet.create({
        markerContainer: {
            alignItems: "center",
            width: 50,
            backgroundColor: "transparent",
            height: 50,
        },
        textContainer: {
            backgroundColor: "grey",
            borderRadius: 10,
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
        },
        text: {
            textAlign: "center",
            paddingHorizontal: 5,
            flex: 1,
            color: "white",
        },
    })
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#ff7b00' }]}>

            <MapboxGL.MapView onPress={(b) => { console.log((b.geometry as any).coordinates) }} localizeLabels={true} logoEnabled={false} style={styler.map} >

                <MapboxGL.Camera animationMode='flyTo' animationDuration={1150} followUserLocation zoomLevel={13}>
                </MapboxGL.Camera>


                {locations != undefined && locations.length != 0 ? (
                    locations.map((user: Get_PRoducto_Profile_USers_ProductsProfile_products_contrate, index) => {
                        return(
                        user.gps_id != undefined && user != undefined ? (
                            <MapboxGL.MarkerView onSelected={() => {
                            }} id={"1"} coordinate={[parseFloat(user.gps_id.longitud), parseFloat(user.gps_id.latitud)]}>

                                
                                <View>
                                    <View style={[stylera.markerContainer, { backgroundColor: 'red', borderRadius: 50, justifyContent: 'center', alignContent: 'center' }]}>
                                        <View style={{ position: 'absolute', justifyContent: 'center', alignContent: 'center' }}>
                                            <Text style={{ textShadowColor: 'black', color: 'white', textShadowRadius: 5, fontWeight: 'bold', fontSize: 8, textAlign: 'center' }}> {user.email}</Text>
                                            {
                                                user.photo != undefined ? (
                                                    <Image source={{ uri: user.photo }} style={{ width: 50, height: 50, alignContent: 'center', justifyContent: 'center', position: 'absolute', alignItems: 'center', alignSelf: 'center' }}>

                                                    </Image>
                                                ) : null
                                            }

                                        </View >

                                    </View>
                                </View>
                            </MapboxGL.MarkerView>
                        ) : null)
                    })
                ) : null
                }

                <MapboxGL.UserLocation onUpdate={(location) => {
                }} androidRenderMode='gps' showsUserHeadingIndicator={true} >
                </MapboxGL.UserLocation>
            </MapboxGL.MapView>
        </SafeAreaView>
    );
}

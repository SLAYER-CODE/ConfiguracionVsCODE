import React from 'react';
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

export function HomeLocation() {
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
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#ff7b00' }]}>

            <MapboxGL.MapView onPress={(b) => { console.log((b.geometry as any).coordinates) }} localizeLabels={true} logoEnabled={false} style={styler.map} >


                {/* <MapboxGL.PointAnnotation
    key={1}
    id={"2"}
    title="Pruevas"
    snippet='Sele'
    onSelected={
        () => {
            console.log("Primero")
        }
    }
    coordinate={CENTER_COORD}> */}

                {/* </MapboxGL.PointAnnotation> */}
                <MapboxGL.Camera animationMode='flyTo' animationDuration={1150} followUserLocation zoomLevel={13}>

                </MapboxGL.Camera>
       


                <MapboxGL.UserLocation onUpdate={(location) => {

                }} androidRenderMode='gps' showsUserHeadingIndicator={true} >
                </MapboxGL.UserLocation>
                {/* 
    <MapboxGL.ShapeSource id='line1' shape={{ type: 'FeatureCollection', features: [{ type: 'Feature', properties: {}, geometry: { type: "LineString", coordinates: [CENTER_COORD, CENTER_COORD_S] } }] }}>
        <MapboxGL.LineLayer id='linelayer1' style={{ lineColor: 'red' }} />
    </MapboxGL.ShapeSource> */}
            </MapboxGL.MapView>
        </SafeAreaView>
    );
}

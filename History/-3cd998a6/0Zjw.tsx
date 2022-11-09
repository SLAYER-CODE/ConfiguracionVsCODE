import React, { useState } from 'react'
import { Text, SafeAreaView, StyleSheet, View, PermissionsAndroid } from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../../../Stylos/Styles'
import MapboxGL, { MapView, Terrain } from '@rnmapbox/maps';
import Icon from 'react-native-vector-icons/AntDesign';
import StoreLocatorKit from '@mapbox/store-locator-react-native'
import Geolocation from '@react-native-community/geolocation';
import { GET_LOCATION_SERVICES, GET_SERVICE_LOCATION } from '../../../GraphQl/Queries';
import { useQuery } from '@apollo/client';
import { Get_Location_Services, Get_Location_Services_GpsServices, Get_Location_Services_GpsServices_gps_relation, Get_Service_Location, Get_Service_Location_Products, Get_Service_Location_Products_gps_relation } from '../../../GraphQl/Types';
function MessageTab() {
    // const { loading, error, data, refetch } = useQuery<Get_Location_Services>(GET_LOCATION_SERVICES);
    const { loading, error, data, refetch } = useQuery<Get_Service_Location>(GET_SERVICE_LOCATION);

    const [locations, setLocations] = React.useState<Get_Service_Location_Products[]>();
    React.useEffect(() => {
        if (data != undefined) {
            console.log(data);
            setLocations(data.Products);
        }
    }, [data]);


    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    requestCameraPermission()

    const Marker = ({ coordinate, id, color, label }) => {
        return (
            <MapboxGL.MarkerView coordinate={coordinate} id={id}>
                <View
                    style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: color,
                    }}
                />
                <View>
                    <Text>{label}</Text>
                </View>
            </MapboxGL.MarkerView>
        );
    };

    const CENTER_COORD = [-70.0199896, -15.8466065];
    const CENTER_COORD_S = [-70.0199896, -15.8466060];
    // const { coordinates, icon, size } = useState;

    // const features = {
    //   type: 'Feature',
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [coordinates.longitude, coordinates.latitude],
    //   }
    // }

    const styler = StyleSheet.create({
        page: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF'
        },
        container: {
            height: 300,
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
    const reallyCoolIcon = () => {
        return (
            <Text>
                <Icon name='minuscircle'></Icon>
            </Text>
        )
    }


    const theme = new StoreLocatorKit.Theme({
        icon: reallyCoolIcon,
        activeIcon: reallyCoolIcon,
        styleURL: MapboxGL.StyleURL.Light,
        primaryColor: `#A35BCD`,
        primaryDarkColor: '#5D39BA',
        directionsLineColor: '#987DDF',
        cardIcon: reallyCoolIcon,
        cardTextColor: '#6A159B',
        accentColor: '#C7A8D9',
    });
    const item = {
        "id": "1",
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [
                -77.034084142948,
                38.909671288923
            ]
        },
        "properties": {
            "name": "Place 1",
            "phoneFormatted": "(202) 234-7336",
            "addressFormatted": "33 Birchwood Drive, North Arlington",
            "hoursFormatted": "10 AM - 9 PM"
        }
    }
    //   const layerStyles = MapboxGL.StyleSheet.create({
    //     buildings: {
    //       fillColor: MapboxGL.StyleSheet.create({ 10: 'blue', 20: 'green' }),
    //       fillOpacity: 0.84
    //     }
    //   });
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
    const generateColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0');
        return `#${randomColor}`;
      };
    var asd
    return (
        <View style={styles.container}>
            <View style={styles.container}>

                {/* <StoreLocatorKit.MapView
                    simulateUserLocation
                    accessToken={MAPBOX_ACCESS_TOKEN}
                    theme={theme}
                    centerCoordinate={this.state.initialLocation}
                    featureCollection={item}
                    zoomLevel={13}
                    style={{fel}} 
                    /> */}

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
                    {   
                        locations != undefined ? (
                            asd=generateColor(),
                            locations.map((e: Get_Service_Location_Products, index) => {
                                console.log(e.gps_relation)
                                e.gps_relation?.map((h:Get_Service_Location_Products_gps_relation,index)=>{

                                    return (
                                        <MapboxGL.MarkerView onSelected={() => {
                                           
                                        }} id={index.toString()} coordinate={[parseFloat(h.latitud), parseFloat(h.longitud)]}>
                                            <View>
                                                <View style={[stylera.markerContainer,{backgroundColor:asd,borderRadius:50,justifyContent:'center',alignContent:'center'}]}>
                                                    <View style={{position:'absolute'}}>
                                                        <Text style={{textShadowColor:'black',color:'white',textShadowRadius:5,fontWeight:'bold',fontSize:8,textAlign:'center'}}> {e.product_name}</Text>
                                                        {/* <Text style={{textShadowColor:'black',color:'yellow',textShadowRadius:5,fontWeight:'bold',fontSize:10,textAlign:'center'}}> {e.price_unity}</Text> */}
                                                    </View>
                                                </View>
                                            </View>
                                        </MapboxGL.MarkerView>
                                    )

                                })
                            })
                        ) : null
                    }


                    <MapboxGL.UserLocation onUpdate={(location) => {
                       
                    }} androidRenderMode='gps' showsUserHeadingIndicator={true} >
                    </MapboxGL.UserLocation>
                    {/* 
                        <MapboxGL.ShapeSource id='line1' shape={{ type: 'FeatureCollection', features: [{ type: 'Feature', properties: {}, geometry: { type: "LineString", coordinates: [CENTER_COORD, CENTER_COORD_S] } }] }}>
                            <MapboxGL.LineLayer id='linelayer1' style={{ lineColor: 'red' }} />
                        </MapboxGL.ShapeSource> */}
                </MapboxGL.MapView>
                {/* 
                    <MapboxGL.MapView style={styler.map} >
                        <MapboxGL.VectorSource id='composite'>
                        <MapboxGL.FillLayer 
                            id='buildingFill'
                            sourceID='composite' 
                          />
                        </MapboxGL.VectorSource >
                        <MapboxGL.Camera centerCoordinate={[-122.400021, 37.789085]}></MapboxGL.Camera> 
                    </MapboxGL.MapView> */}
            </View>
        </View>
    )
}

export default MessageTab

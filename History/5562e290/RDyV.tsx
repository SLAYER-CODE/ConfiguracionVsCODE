import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Image } from 'react-native-animatable';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import AwesomeButton from 'react-native-really-awesome-button';
import { client } from '../../apollo.config';
import { GET_PRODUCTO_PROFILE_USERS } from '../GraphQl/Queries';
import { Get_Producto_Profile_ProductsProfile_image_realation, Get_PRoducto_Profile_USers, Get_PRoducto_Profile_USers_ProductsProfile, Get_PRoducto_Profile_USers_ProductsProfile_image_realation, Get_PRoducto_Profile_USers_ProductsProfile_products_contrate, Get_PRoducto_Profile_USers_ProductsProfile_products_contrate_gps_id } from '../GraphQl/Types';
import { styles } from '../Stylos/Styles';
import IconAwesone from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Icon } from 'react-native-elements';
import { AfterPressFn } from 'react-native-really-awesome-button-fixed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClientsUbication } from '../TypeDefinitios/DefinitiosNavigateMain';
import { useNavigation } from '@react-navigation/native';

function Ventas() {
  // type userTypeUbication = {
  //   location: undefined;
  //   Search: undefined;
  //   Agregate: undefined;
  //   Chat: undefined;
  // };
  type ProfileScreenHomeNavigation = NativeStackNavigationProp<
    ClientsUbication,
    'Ventas'>;
    const NavigationHome = useNavigation<ProfileScreenHomeNavigation>();

  const { loading, error, data, refetch } = useQuery<Get_PRoducto_Profile_USers>(GET_PRODUCTO_PROFILE_USERS);
  var usersLocations:Get_PRoducto_Profile_USers_ProductsProfile_products_contrate[]=[]
  const [Locations,setLocation]=React.useState<Get_PRoducto_Profile_USers_ProductsProfile_products_contrate[]>([])
  const [LocationsRef,LocationsRefset]=React.useState<Get_PRoducto_Profile_USers_ProductsProfile_products_contrate[]>([])

  useEffect(() => {
    console.log("############################################################################################################################")
    data?.ProductsProfile.map((dato,index)=>{
      console.log("No hay items")
      if(dato.products_contrate?.length!=0){
        dato.products_contrate?.map((a,ind)=>{
          usersLocations.push(a)
        })
      }

    })
    console.log("final")
    console.log(usersLocations)
    LocationsRefset(usersLocations)
   }, [data]);

  return (
    <SafeAreaView
      style={[styles.containerAbsolute, { paddingTop: 70, backgroundColor: '#ff8000' }]}>
                 <ScrollView style={{
    borderRadius: 30,
    backgroundColor: '#e67f1230',
    marginBottom: 80
  }}>
    
      <View style={{flex:1}}>
        <View style={{
        }}>
          {data?.ProductsProfile.length != 0 && data != undefined ? (

            data.ProductsProfile.map((item: Get_PRoducto_Profile_USers_ProductsProfile, i) => {
              return (
                <View>

                  <View style={{ width: "100%", padding: 10, backgroundColor: '#FFF', borderWidth: 5, borderColor: 'black', flexDirection: 'row' }}>
                    <Text style={{ flex: 1, textAlignVertical: 'center', justifyContent: 'center' }}>{item.product_name}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, textAlignVertical: 'center', textAlign: 'center' }}> (Servicio)</Text>
                  </View>
                  <View style={{ flexDirection: "row", width: "100%", height: 45 }}>
                    {item.image_realation?.map((image: Get_PRoducto_Profile_USers_ProductsProfile_image_realation, index) => {
                      return (
                        <View style={{ flex: 1 }}>
                          <Image style={{ borderColor: 'black', borderWidth: 2, width: "100%", height: "100%" }} source={{ uri: image.image_name?.toString() }}>
                          </Image>
                        </View>
                      )
                    })}
                  </View>
                  {item.products_contrate?.length != 0 && item.products_contrate != undefined ? (
                    item.products_contrate.map((user: Get_PRoducto_Profile_USers_ProductsProfile_products_contrate, indexUser) => {
                      return (
                        <View style={{
                          alignSelf: "center", flexDirection: 'row',
                          margin: 5, borderBottomColor: "black", backgroundColor: "#ffffff70"
                          , borderTopEndRadius: 30, borderBottomLeftRadius: 20, borderWidth: 1, width: 380, flexBasis: 75, alignContent: "center", justifyContent: "space-between", alignItems: "flex-start"
                        }}>

                          {user.photo == undefined ? (
                            <View style={{ margin: 10, flex: 0, justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: "red", width: 50, height: 50, borderRadius: 50 }}>
                              <IconAwesone name="user-circle-o" size={50}>

                              </IconAwesone>
                            </View>

                          ) : (<Image
                            source={{ uri: user.photo }}
                            style={{ margin: 10, flex: 0, justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: "red", width: 50, height: 50, borderRadius: 50 }}
                          />
                          )}

                          <View style={{ position: "absolute", left: 5, bottom: -20, flexDirection: "row" }}>
                            <AwesomeButton
                              progress
                              springRelease
                              style={{ height: 29 }}
                              backgroundDarker={'#fffb0060'}
                              borderColor={'aqua'}
                              width={85}
                              height={30}
                              borderTopLeftRadius={30}
                              borderBottomLeftRadius={30}
                              textColor="black"
                              borderWidth={1.5}
                              onPress={(nextt?: AfterPressFn) => { 
                                NavigationHome.navigate("Location",{Locations:[user]})
                                nextt?.call(0,(()=>{}))
                              }}
                              backgroundColor={'#fffb0060'}
                              backgroundShadow={'#ff000080'}>
                              Ubicar
                            </AwesomeButton>
                            <AwesomeButton
                              progress
                              springRelease
                              style={{ height: 29 }}
                              backgroundDarker={'#fffb0060'}
                              borderColor={'red'}
                              width={85}
                              height={30}
                              borderTopRightRadius={30}
                              borderBottomRightRadius={30}
                              textColor="black"
                              borderWidth={1.5}
                              backgroundColor={'#fffb0060'}
                              backgroundShadow={'#ff0000'}>
                              Expulsar
                            </AwesomeButton>
                          </View>
                          <View style={{ margin: 5, flexDirection: "column", flexBasis: 300 }}>
                            <Text style={{ position: 'relative', width: "100%", borderRadius: 20, bottom: 0, fontWeight: 'bold' }}>
                              Nombre:{user.email}
                            </Text>
                            <Text style={{ position: 'relative', width: "100%", borderRadius: 20, bottom: 0 }}>
                              Ubicacion
                            </Text>
                            <View style={{ flexDirection: "row", flex: 0 }}>
                              <Text style={{ fontWeight: 'bold', flex: 1, position: 'relative', borderRadius: 20, bottom: 0 }}>
                                Latitud: {user.gps_id?.latitud}
                              </Text>
                              <Text style={{ fontWeight: 'bold', flex: 1, position: 'relative', borderRadius: 20, bottom: 0 }}>
                                Longitud:  {user.gps_id?.longitud}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )
                    })
                  ) :
                    (
                      <View style={{ backgroundColor: '#FFFFFF50', width: "100%", height: 75, marginTop: 10, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 23, padding: 10, textAlign: 'center', textAlignVertical: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                          No hay clientes para este servicio
                        </Text>
                      </View>
                    )
                  }
                </View>)
            })
          ) : null}
        </View>
      </View>

  </ScrollView>
      <AwesomeButton
        backgroundShadow={'#fffb00'}
        backgroundColor={'cyan'}
        backgroundDarker={'#ff0000'}
        borderColor={'#fffb00'}
        width={60}
        height={60}
        borderRadius={60}
        textColor="black"
        borderWidth={1.5}
        onPress={() => {
          refetch()
        }}
        style={{ position: 'absolute', bottom: 10, right: 10 }}
      
        >
        <Text style={{ fontWeight: 'bold' }}><IconAwesone name='refresh' size={30}></IconAwesone></Text>
      </AwesomeButton>
      <AwesomeButton
        backgroundShadow={'#fffb00'}
        backgroundColor={'yellow'}
        backgroundDarker={'#ff0000'}
        borderColor={'#fffb00'}
        width={210}
        height={60}
        borderRadius={60}
        textColor="black"
        borderWidth={1.5}
        style={{ position: 'absolute', bottom: 10, left: 10 }}
        onPress={(nextt?: AfterPressFn) => { 
          console.log(Locations)
          NavigationHome.navigate("Location",{Locations:LocationsRef})
          nextt?.call(0,(()=>{}))
        }}
     >
        <Text style={{ fontWeight: 'bold' }}><FontAwesome5 name='search-location' size={20}></FontAwesome5> Ubicar todos los clientes</Text>
      </AwesomeButton>
    </SafeAreaView>
  );
}

export default Ventas;

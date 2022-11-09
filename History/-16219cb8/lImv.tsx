import React, { useEffect } from 'react';

import {styles} from '../Stylos/Styles';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {HomeParamList} from '../TypeDefinitios/DefinitiosNavigateMain';
import HomeTab from './Dranwable/TabsDraws/HomeTab';
import AgregateTab from './Dranwable/TabsDraws/AgregateTab';
import SearchTab from './Dranwable/TabsDraws/SearchTab';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconEmty from 'react-native-vector-icons/Entypo';
import MessageTab from './Dranwable/TabsDraws/ChatsTab';
import GetLocation from 'react-native-get-location'
import { PermissionsAndroid } from 'react-native';
import { UPDATE_RELATION_LOCATION_USER } from '../GraphQl/Queries';
import { client } from '../../apollo.config';

const Tab = createMaterialBottomTabNavigator<HomeParamList>();

function Home() {
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

  
  const getItem=( async ()=>{
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(async (location) => {
      const { data, errors: final } = await client.mutate({
        mutation: UPDATE_RELATION_LOCATION_USER,
        variables: {
          location:{
            direccion:"Sin ubicacion",
            latitud:location["latitude"],
            longitud:location["longitude"]
          }
        }
      }
      )
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
  })

  const sincrone = (async () => {
    var i = 0;
    while (await (new Promise(resolve => setTimeout(() => resolve(i++), 25000)) as any) > -1) {
      await getItem()
    } 
  })();
  getItem()
  useEffect(() => {
    (async () => {
        await sincrone
    })()
  }, [])

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="red"
      inactiveColor="black"
      barStyle={{backgroundColor: '#ff9900'}}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Casa',
          tabBarIcon: ({color}) => (
            <Icon name="house" color={color} size={26} />
          ),
        }}
        component={HomeTab}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({color}) => (
            <Icon name="search" color={color} size={26} />
          ),
        }}
        component={SearchTab}
      />
      {/* <Tab.Screen name='Agregate' options={{
                tabBarLabel: 'Agregar',
                tabBarIcon: ({ color }) => (
                    <Icon name="add" color={color} size={26} />
                ),
            }} component={AgregateTab} /> */}
      <Tab.Screen
        name="Chat"
        options={{
          tabBarLabel: 'Locacion',
          tabBarIcon: ({color}) => <IconEmty name="location" color={color} size={26} />,
        }}
        component={MessageTab}
      />
    </Tab.Navigator>
  );
}

export default Home;

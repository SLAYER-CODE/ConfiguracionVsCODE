import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';


import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {createIconSetFromFontello} from 'react-native-vector-icons';
import RootStackParamList, { HomeUbication, RootMain } from '../../../../TypeDefinitios/DefinitiosNavigateMain';
import HomeTab from '../HomeTab';
import { HomeLocation } from './HomeLocation';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// var SharedPreferences = require('react-native-shared-preferences');

//Funciona para llamar al navegador de los datos
const Stack = createNativeStackNavigator<HomeUbication>();
const drawerStyle = {
  activeTintColor: 'black',
  inactiveTintColor: 'black',
  labelStyle: {
    fontFamily: 'montserrat',
    marginVertical: 16,
    marginHorizontal: 0,
  },
  iconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {},
};
export const HomeTabIndex = (): JSX.Element => {
  type ProfileScreenHomeNavigation = NativeStackNavigationProp<
    HomeUbication,
    'Home'
  >;

  return (
        <Stack.Navigator
          screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
          <Stack.Screen name="Home" component={HomeTab} />
          <Stack.Screen name="Location" component={HomeLocation} />
          {/* <Stack.Screen
            name="Main"
            options={{animation: 'slide_from_left'}}
            component={Auth}
          /> */}  
        </Stack.Navigator>
  );
};

export default HomeTabIndex;

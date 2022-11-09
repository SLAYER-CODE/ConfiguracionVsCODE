import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import RootStackParamList, {
  RootMain,
} from '../TypeDefinitios/DefinitiosNavigateMain';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  PresScreenOne,
  PresScrennTree,
  PressScreenTwo,
} from '../Screens/Precentaciones';
import ScrennMain from '../Screens/ScrennMain';
import Auth from '../Screens/Auth';
import ReguisterScreen from '../Screens/ReguisterScreen';
import RecuperateScreen from '../Screens/RecuperateScreen';
import {createIconSetFromFontello} from 'react-native-vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {storagemkv} from '../../App';
// var SharedPreferences = require('react-native-shared-preferences');

//Funciona para llamar al navegador de los datos
const Stack = createNativeStackNavigator<RootStackParamList>();
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
export const AppIndex = (): JSX.Element => {
  const value = storagemkv.getBoolean('presentations'); // 'Marc'
  const valueauth = storagemkv.getBoolean('autentication');
  type ProfileScreenHomeNavigation = NativeStackNavigationProp<
    RootMain,
    'Auth'
  >;

  console.log(value);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!value ? (
          <Stack.Navigator
            screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
            <Stack.Screen name="PresOne" component={PresScreenOne} />
            <Stack.Screen name="PresTwo" component={PressScreenTwo} />
            <Stack.Screen name="PresTree" component={PresScrennTree} />
            <Stack.Screen
              name="Main"
              options={{animation: 'slide_from_left'}}
              component={Auth}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
            <Stack.Screen
              name="Main"
              options={{animation: 'slide_from_left'}}
              component={Auth}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppIndex;

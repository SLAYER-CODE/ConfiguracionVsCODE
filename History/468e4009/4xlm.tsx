import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';


import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import RootStackParamList, { HomeUbication, RootMain } from '../../../../TypeDefinitios/DefinitiosNavigateMain';
import HomeTab from '../HomeTab';
import { HomeLocation } from './HomeLocation';
import { View } from 'react-native-animatable';
import { TouchableHighlight } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// var SharedPreferences = require('react-native-shared-preferences');
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

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
  const Root = createStackNavigator<HomeUbication>();
  const navigation = useNavigation<ProfileScreenHomeNavigation>();

  return (
    <Root.Navigator
      screenOptions={{ headerShown: false}}>
      <Root.Screen name="Home" component={HomeTab} />
      {/* <Stack.Screen name="Location" component={HomeLocation} /> */}


      <Root.Screen
        name="Location"
        options={{
          headerRight: () => <></>,
          headerLeft: () => (
            <View
              style={{
                marginRight: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableHighlight
                style={{ width: 30, height: 50, borderRadius: 200 }}
                activeOpacity={0.2}
                underlayColor="#ff000080"
                onPress={() => {
                  navigation.canGoBack();
                }}>
                <View
                  style={{
                    justifyContent: 'space-evenly',
                    height: 80,
                    width: 110,
                    flex: 0,
                    flexDirection: 'row',
                  }}>
                  <Icon
                    name={'arrow-right'}
                    style={{ bottom: 25 }}
                    size={100}
                    color="yellow"
                  />
                  <Icon
                    name={'arrow-right'}
                    style={{ right: 55, bottom: 15 }}
                    size={80}
                    color="#ff000080"
                  />
                </View>
              </TouchableHighlight>
            </View>
          ),
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Reguistrate',
        }}
        component={HomeLocation}
      />

    </Root.Navigator>
  );
};

export default HomeTabIndex;

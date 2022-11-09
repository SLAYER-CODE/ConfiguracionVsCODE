import React from 'react';

import {styles} from '../Stylos/Styles';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {HomeParamList} from '../TypeDefinitios/DefinitiosNavigateMain';
import HomeTab from './TabsDraws/HomeTab';
import ChatsTab from './TabsDraws/ChatsTab';
import AgregateTab from './TabsDraws/AgregateTab';
import SearchTab from './TabsDraws/SearchTab';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialBottomTabNavigator<HomeParamList>();

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="blue"
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
          tabBarLabel: 'Conversar',
          tabBarIcon: ({color}) => <Icon name="chat" color={color} size={26} />,
        }}
        component={ChatsTab}
      />
    </Tab.Navigator>
  );
}

export default Home;

import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  CardStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import React, {Fragment, useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Home from '../Navigation/Home';
import Perfil from '../Navigation/Perfil';
import {
  RootMain,
  SubDrawerParamList,
} from '../TypeDefinitios/DefinitiosNavigateMain';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ripple from 'react-native-material-ripple';
import Categorias from '../Navigation/Categorias';
import Productos from '../Navigation/Productos';
import Ventas from '../Navigation/Ventas';
import Transacciones from '../Navigation/Transacciones';
import CarritoDeCompras from '../Navigation/CarritoDeCompras';
import Configuracion from '../Navigation/Configuracion';
import {storagemkv} from '../../App';
import Auth from './Auth';
import AppIndex from '../Component';
import Preview from '../Navigation/Preview';
import auth from '@react-native-firebase/auth';

// type ProfileScreenHomeNavigation = StackNavigationProp<RootMain, 'Main'>;
const Drawer = createDrawerNavigator<SubDrawerParamList>();
type ProfileScreenNavigationProp = DrawerNavigationProp<
  SubDrawerParamList,
  'Home'
>;

type DrawMenuProps = {
  IconName: string;
  Name: string;
  callNavigate: keyof SubDrawerParamList;
  colore: keyof SubDrawerParamList;
  changeColor: Function;
};
function DrawerMenu({
  IconName,
  Name,
  callNavigate,
  colore,
  changeColor,
}: DrawMenuProps) {
  const nav = useNavigation<ProfileScreenNavigationProp>();
  useEffect(() => {
    return () => {};
  });
  return (
    <View 
      style={{
        backgroundColor: colore == callNavigate ? 'black' : 'transparent',borderRadius:25,padding:5
      }}>
      <Ripple
        rippleColor={'black'}
        onPress={() => {
          colore != callNavigate ? nav.navigate(callNavigate) : '';
          changeColor(callNavigate);
        }}>
        <View
          style={{
            flexDirection: 'column-reverse',
            justifyContent: 'center',
            paddingVertical:11,
          }}>
          <View style={{flex: 8.5, justifyContent: 'center',alignContent:'center'}}>
            <Text
              style={{
                textShadowColor: 'black',
                color: 'black',
                textShadowRadius: 10,
                fontWeight: 'bold',
                fontSize: 18, textAlignVertical: 'center',
              }}>
              {' '}
              <Icon name={IconName} size={17} /> {Name}
            </Text>
          </View>
        </View>
      </Ripple>
    </View>
  );
}

const House = (
  <Icon
    style={{position: 'absolute', left: 8, bottom: -4, fontWeight: '300'}}
    name="paper-plane"
    size={45}
    color="orange"
  />
);

const Menu: React.FC<{propiedades: DrawerContentComponentProps}> = ({
  propiedades,
}) => {
  const [stateItem, setstate] = useState<keyof SubDrawerParamList>('Home');

  return (
    <LinearGradient
      style={{flex: 1, borderTopRightRadius: 60}}
      colors={['#ffa600', '#ff7700', '#ff620090', '#ff2f00'].reverse()}>
      <View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: '#A0A0A0',
          }}>
          <TouchableOpacity>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30
              }}>
              {/* <Image
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: 'orange',
                }}
                source={require('../Dranwable/TabsDraws/Icon/MyLogo.png')}
              /> */}
              <Image
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: 'orange',
                }}
                source={{
                  uri: auth().currentUser
                    ? auth().currentUser!.photoURL
                      ? auth().currentUser!.photoURL!
                      : 'https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg'
                    : 'https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg',
                }}
              />

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 2,
                  backgroundColor: 'blue',
                }}>
                {House}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView style={{}}>
        <View style={{}}>
        <DrawerMenu
          IconName="house-user"
          Name="Home"
          callNavigate="Home"
          colore={stateItem}
          changeColor={setstate}
        />
      
        <DrawerMenu
          IconName="th-list"
          Name="Categorias"
          callNavigate="Categorias"
          colore={stateItem}
          changeColor={setstate}
        />
        <DrawerMenu
          IconName="store-alt"
          Name="Mis Productos"
          callNavigate="Productos"
          colore={stateItem}
          changeColor={setstate}
        />
        <DrawerMenu
          IconName="business-time"
          Name="Mis Ventas"
          callNavigate="Ventas"
          colore={stateItem}
          changeColor={setstate}
        />
        <DrawerMenu
          IconName="shopping-cart"
          Name="Mi Carrito"
          callNavigate="CarritoDeCompras"
          colore={stateItem}
          changeColor={setstate}
        />
        <DrawerMenu
          IconName="sitemap"
          Name="Mis Transacciones"
          callNavigate="Transacciones"
          colore={stateItem}
          changeColor={setstate}
        />
        <DrawerMenu
          IconName="camera"
          Name=" Preview 3D"
          callNavigate="Preview"
          colore={stateItem}
          changeColor={setstate}
        />
        <DrawerMenu
          IconName="user"
          Name=" Perfil"
          callNavigate="Perfil"
          colore={stateItem}
          changeColor={setstate}
        />
        <DrawerMenu
          IconName="wrench"
          Name=" Configuracion"
          callNavigate="Configuracion"
          colore={stateItem}
          changeColor={setstate}
        />
        </View>
        </ScrollView>
        {/* <DrawerMenu IconName='home' Name='Home' callNavigate='Main' colore={stateItem} changeColor={setstate} /> */}
      </View>
    </LinearGradient>
  );
};

function ScrennMain() {
  useEffect(() => {
    console.log('Se vuelve setear');
  }, []);
  return (
    <Drawer.Navigator
    
      screenOptions={{
        
        headerTransparent: true,
        headerTintColor: 'red',
        drawerStyle: {
          width: "70%",
          backgroundColor: 'transparent',
          borderTopRightRadius: 80,
          borderColor: 'red',
          borderRightWidth: 20,
        },
      }}
      drawerContent={(props: DrawerContentComponentProps) => (
        <Menu propiedades={props} />
      )}>

      <Drawer.Screen name="Home" component={Home} options={{title: 'Casa'}} />
     
      <Drawer.Screen
        name="Categorias"
        component={Categorias}
        options={{title: 'Categorias'}}
      />
      <Drawer.Screen
        name="Productos"
        component={Productos}
        options={{title: 'Almacen de Productos'}}
      />
      <Drawer.Screen
        name="Ventas"
        component={Ventas}
        options={{title: 'Mis Ventas'}}
      />
      <Drawer.Screen
        name="Transacciones"
        component={Transacciones}
        options={{title: 'Mis Transacciones'}}
      />
      <Drawer.Screen
        name="CarritoDeCompras"
        component={CarritoDeCompras}
        options={{title: 'Mi Carrito de Compras'}}
      />
       <Drawer.Screen
        name="Perfil"
        component={Perfil}
        options={{title: 'Mi Perfil'}}
      />
      <Drawer.Screen
        name="Configuracion"
        component={Configuracion}
        options={{title: 'Configracion'}}
      />
      <Drawer.Screen
        name="Preview"
        component={Preview}
        options={{
          title: 'Preview',
          headerShown: false,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      {/* <Drawer.Screen name="Unlogin" component={Auth} options={{title:'Logout   '}}/> */}
    </Drawer.Navigator>
  );
}

export default ScrennMain;

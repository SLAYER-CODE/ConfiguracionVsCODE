import React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { styles } from '../Stylos/Styles';
import { Text } from 'react-native-animatable';
import auth from '@react-native-firebase/auth';
import AwesomeButton from 'react-native-really-awesome-button';
import { AfterPressFn } from 'react-native-really-awesome-button-fixed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    HomeParamList,
    RootMain,
    SubDrawerParamList,
} from '../TypeDefinitios/DefinitiosNavigateMain';
import { useNavigation } from '@react-navigation/native';
import { storagemkv } from '../../App';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import RNRestart from 'react-native-restart'; // Import package from node modules
import { LoginManager } from 'react-native-fbsdk-next';

function Perfil() {
    // type ProfileTab = DrawerNavigationProp<HomeParamList, 'Home'>;

    // type ProfileScreenNavigationProp = DrawerNavigationProp<SubDrawerParamList, 'Unlogin'>;

    // type ProfileScreenHomeNavigation = NativeStackNavigationProp<RootMain, 'MainInit'>;

    // const Authprofile = useNavigation<ProfileTab>();
    // const AuthStack = useNavigation<ProfileScreenNavigationProp>();
    console.log(auth().currentUser?.photoURL!);
    return (
        <SafeAreaView
            style={[styles.containerAbsolute, { backgroundColor: '#ff8000' }]}>
            <ScrollView
                style={{
                    borderRadius: 30,
                    backgroundColor: '#FFFFFF30',
                    marginHorizontal: 10,
                    marginTop: 50,
                    marginBottom: 10,
                    bottom: 0,
                    top: 0,
                    left: 0,
                    right: 0,
                    position: 'absolute',
                    padding: 20,
                    borderWidth: 2,
                }}>
                <View
                    style={{
                        display: 'flex',
                        alignContent: 'space-between',
                        justifyContent: 'flex-end',
                        bottom: 0,
                        top: 0,
                        left: 0,
                        right: 0,
                        flex: 1,
                        flexDirection: 'column',
                        borderWidth: 1,
                        borderRadius: 30,
                        width: '100%',
                        padding: 20,
                    }}>
                    <View
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{ uri: auth().currentUser?.photoURL! }}
                            style={{ width: 200, height: 200, borderWidth: 2 }}
                        />
                    </View>
                    <View
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {auth().currentUser?.displayName}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {auth().currentUser?.email}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {auth().currentUser?.uid}
                        </Text>
                    </View>

                    <View
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {auth().currentUser?.providerId.toUpperCase()}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignContent: 'flex-start',
                    }}>
                    <AwesomeButton
                        progress
                        springRelease
                        style={{ height: 40, marginTop: 20 }}
                        backgroundDarker={'#36A382'}
                        backgroundColor={'red'}
                        borderColor={'aqua'}
                        width={345}
                        height={40}
                        borderRadius={30}
                        textColor="black"
                        borderWidth={1.5}
                        onPress={(nextt?: AfterPressFn) => {
                            // AuthStack.navigate("Unlogin")
                            nextt!(async () => {
                                await storagemkv.set('autentication', false);
                                await auth().signOut();
                                LoginManager.logOut()
                                await RNRestart.Restart();
                                // AuthStack.navigate("Unlogin")

                                // AuthStack.reset({
                                //     index: 1,routes: [{ name: 'Unlogin' }],
                                // })
                            });
                        }}>
                        <Text>LOGOUT</Text>
                    </AwesomeButton>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Perfil;

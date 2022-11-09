import React, {Provider} from 'react';
import {Alert, Image, StatusBar} from 'react-native';
import {Text, View} from 'react-native-animatable';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../Stylos/Styles';
import RadialGradient from 'react-native-radial-gradient';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'rn-material-ui-textfield';
import AwesomeButton, {
  AfterPressFn,
} from 'react-native-really-awesome-button-fixed';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import RootStackParamList, {
  RootMain,
} from '../TypeDefinitios/DefinitiosNavigateMain';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {printLocation} from 'graphql';

type ProfileScreenHomeNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'PresOne'
>;
type ProfileScreenHomeRoot = NativeStackNavigationProp<RootMain, 'Auth'>;

async function functionRegister(
  user: string,
  pwd: string,
  nombre: string,
): Promise<String> {
  return await auth()
    .createUserWithEmailAndPassword(user, pwd)
    .then(result => {
      console.log('User account created & signed in!');
      result.user.updateProfile({
        displayName: nombre,
      });
      return 'true';
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        return 'useemail';
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        return 'invalided';
      }
      return error.code;
    })
    .finally(() => {
      return 'false';
    });
}

function showAlert(
  title: string,
  subtitle: string,
  button: string,
  dat: Function,
) {
  Alert.alert(title, subtitle, [
    {
      text: button,
      onPress: () => dat,
    },
  ]);
}

function ReguisterScreen() {
  const AuthStack = useNavigation<ProfileScreenHomeNavigation>();

  const AuthStackroot = useNavigation<ProfileScreenHomeRoot>();

  const nombre = React.createRef<TextField>();
  const email = React.createRef<TextField>();
  const password = React.createRef<TextField>();
  const pwdverifi = React.createRef<TextField>();
  const [button, setbutton] = React.useState<boolean>(false);

  const [stateError, setstateError] = React.useState<String>('');
  const [stateEmail, setstateEmail] = React.useState<String>('');
  const [stateButton, setButton] = React.useState<Boolean>(false);

  React.useEffect(() => {
    if (
      nombre.current?.value() != '' &&
      email.current?.value() != '' &&
      password.current?.value() != '' &&
      pwdverifi.current?.value() != ''
    ) {
      if (stateError == '' && stateEmail == '') {
        setbutton(true);
      } else {
        setbutton(false);
      }
    } else {
      setbutton(false);
    }
  }, [stateError, stateEmail]);

  function onSubmitPassword() {
    console.log('SE EDITO');
    password.current?.blur();
  }

  function onEmailVerify(params: string) {
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    if (regexp.test(params)) {
      setstateEmail('');
    } else {
      setstateEmail('Email no es correcto');
    }
  }

  function onChangeVerify(pwd: String) {
    if (password.current?.value() != pwd) {
      setstateError('La contraseña no es igual');
    } else {
      setstateError('');
    }
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#ff8400'}]}>
      <StatusBar hidden={true} showHideTransition={'fade'} />

      <View
        style={{
          zIndex: 2,
          alignItems: 'center',
          shadowOffset: {
            width: 10,
            height: 200,
          },
          width: 380,
          height: 700,
          borderTopLeftRadius: 90,
          borderTopRightRadius: 90,
          borderBottomLeftRadius: 91,
          borderBottomRightRadius: 91,
          borderWidth: 0,
          shadowColor: '#ff0000',
          shadowOpacity: 0.5,
          shadowRadius: 20,
          elevation: 25,
        }}>
        <RadialGradient
          style={{
            position: 'absolute',
            width: 360,
            height: 500,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          colors={['#3BFFF533', '#182B3733', 'transparent']}
          stops={[0.5, 0.2, 0.2, 0.2]}
          center={[190, 250]}
          radius={350}>
          <Image
            style={{
              width: 180,
              height: 180,
              bottom: 90,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#36A382',
            }}
            source={require('../Navigation/Dranwable/TabsDraws/Icon/MyLogo.png')}
          />
        </RadialGradient>

        <View style={{width: 280, height: 400, padding: 15, top: 250}}>
          <FilledTextField
            // style={{borderBottomWidth:2}}
            ref={nombre}
            lineWidth={3}
            clearTextOnFocus={false}
            inputContainerStyle={{
              // fontWeight: 'bold',
              paddingTop: 6,
              paddingLeft: 10,
              backgroundColor: 'transparent',
              borderColor: 'aqua',
              borderRadius: 20,
              shadowColor: '#000000',
              shadowOpacity: 0.5,
              shadowRadius: 100,
              elevation: 30,
            }}
            textColor="white"
            tintColor="white"
            baseColor="#000000"
            fontSize={15}
            labelFontSize={20}
            secureTextEntry={false}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            label="Nombre"
            title="Inserte su Nombre"
            maxLength={30}
            characterRestriction={30}
            autoCompleteType="username"
            textContentType="name"
            keyboardType="default"
          />

          <FilledTextField
            ref={email}
            clearTextOnFocus={false}
            onChangeText={text => {
              onEmailVerify(text);
            }}
            error={stateEmail.toString()}
            lineWidth={3}
            inputContainerStyle={{
              // fontWeight: 'bold',
              paddingTop: 6,
              paddingLeft: 10,
              backgroundColor: 'transparent',
              borderColor: 'aqua',
              borderRadius: 20,
              shadowColor: '#000000',
              shadowOpacity: 0.5,
              shadowRadius: 100,
              elevation: 30,
            }}
            textColor="white"
            tintColor="white"
            baseColor="#000000"
            fontSize={15}
            labelFontSize={20}
            secureTextEntry={false}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            label="Email"
            title="Inserte su correo electronico"
            maxLength={30}
            characterRestriction={30}
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <FilledTextField
            ref={password}
            // style={{borderBottomWidth:2}}
            lineWidth={3}
            clearTextOnFocus={false}
            inputContainerStyle={{
              paddingTop: 6,
              paddingLeft: 10,
              backgroundColor: 'transparent',
              borderColor: 'aqua',
              borderRadius: 20,
              shadowColor: '#000000',
              shadowOpacity: 0.5,
              shadowRadius: 100,
              elevation: 30,
            }}
            textColor="white"
            tintColor="white"
            baseColor="#000000"
            fontSize={15}
            labelFontSize={20}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            label="Password"
            title="Inserte su contraseña"
            maxLength={30}
            textContentType="password"
            // keyboardType="visible-password"
            characterRestriction={30}
          />
          <FilledTextField
            ref={pwdverifi}
            clearTextOnFocus={false}
            error={stateError.toString()}
            lineWidth={3}
            onChangeText={pwd => {
              onChangeVerify(pwd);
            }}
            onSubmitEditing={onSubmitPassword}
            inputContainerStyle={{
              paddingTop: 6,
              paddingLeft: 10,
              backgroundColor: 'transparent',
              borderColor: 'aqua',
              borderRadius: 20,
              shadowColor: '#000000',
              shadowOpacity: 0.5,
              shadowRadius: 100,
              elevation: 30,
            }}
            textColor="white"
            tintColor="white"
            baseColor="#000000"
            fontSize={15}
            labelFontSize={20}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            textContentType="newPassword"
            // keyboardType="visible-password"
            label="Password"
            title="Confirme su contraseña"
            maxLength={30}
            characterRestriction={30}
          />
          {/* <View style={{ flex: 1, flexDirection: 'column' }}> */}

          {/* </View> */}
          <AwesomeButton
            disabled={!button}
            progress
            style={{height: 40, top: 20}}
            backgroundDarker={'#fff200'}
            borderColor={'aqua'}
            width={150}
            height={40}
            textColor="black"
            borderWidth={1.5}
            backgroundColor={!button ? '#00ACB240' : '#00FFE560'}
            backgroundShadow={'#4C63D2'}
            springRelease
            onPress={(nexttt?: AfterPressFn) => {
              nexttt!(async () => {
                const datOP = await functionRegister(
                  email.current?.value()!,
                  password.current?.value()!,
                  nombre.current?.value()!,
                );
                console.log(datOP);
                if (datOP == 'true') {
                  AuthStackroot.reset({
                    index: 1,
                    routes: [{name: 'MainInit'}],
                  });
                } else {
                  if (datOP == 'invalided') {
                    showAlert(
                      'Error',
                      'Emain invalido cambielo inserte otro',
                      'Aceptar',
                      () => {
                        email.current?.focus();
                      },
                    );
                  } else if (datOP == 'useemail') {
                    showAlert(
                      'Error',
                      'Email ya registrado inserte otro',
                      'Aceptar',
                      () => {
                        email.current?.focus();
                      },
                    );
                  } else {
                    showAlert(
                      'Error',
                      'Erro no identificado ' + datOP,
                      'Reintentar',
                      () => {
                        email.current?.focus();
                      },
                    );
                  }
                }
              });
            }}>
            Registrame
          </AwesomeButton>
        </View>

        {/* <BlurView blurType='dark' blurAmount={2} >
                <Text>Hi, I am a tiny menu item</Text>
            </BlurView> */}
        {/* <Image style={{backgroundColor:'#F2FFF233'}} blurRadius={10} source={require('./ImagenAuth/FondLogin.png')}/> */}
      </View>
    </SafeAreaView>
  );
}

export default ReguisterScreen;

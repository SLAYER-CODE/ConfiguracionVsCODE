import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../Stylos/Styles';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'rn-material-ui-textfield';
import AwesomeButton from 'react-native-really-awesome-button-fixed';
import OTPInputView from 'react-native-otp-input';
import Icon from 'react-native-vector-icons/FontAwesome';

function RecuperateScreen() {
  const styless = StyleSheet.create({
    borderStyleBase: {
      width: 30,
      height: 45,
    },

    borderStyleHighLighted: {
      borderColor: '#03DAC6',
    },

    underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 4,
      fontSize: 20,
      color: 'white',
    },

    underlineStyleHighLighted: {
      borderColor: '#03DAC6',
    },
  });
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: '#ff7b00'}]}>
      <StatusBar hidden={true} showHideTransition={'fade'} />
      <View
        style={{
          zIndex: 2,
          alignItems: 'center',
          justifyContent: 'center',
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
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 20,
          elevation: 25,
        }}>
        <View style={{bottom: 50}}>
          <Text
            style={{width: 250, fontSize: 20, color: 'black'}}
            adjustsFontSizeToFit={true}
            numberOfLines={3}>
            La seguridad es importante para nosostros por favor Inserte su email
            se le enviara un codigo de seguridad.
          </Text>
        </View>
        <View
          style={{
            width: 300,
            padding: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FilledTextField
            lineWidth={3}
            lineType="dashed"
            inputContainerStyle={{
              // fontWeight: 'bold',
              paddingTop: 6,
              paddingLeft: 10,
              backgroundColor: 'transparent',
              borderColor: 'black',
              borderRadius: 20,
              shadowColor: '#000',
              shadowOpacity: 0.5,
              shadowRadius: 100,
              elevation: 30,
              width: 300,
            }}
            textColor="white"
            tintColor="white"
            baseColor="#000"
            fontSize={15}
            labelFontSize={20}
            secureTextEntry={false}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            clearTextOnFocus={true}
            returnKeyType="done"
            label="Inserte su Email"
            title="Inserte su Email"
            maxLength={30}
            characterRestriction={30}
            keyboardType="default"
          />
          <View style={{width: 150, height: 40, position: 'relative'}}>
            <AwesomeButton
              backgroundDarker={'#fff200'}
              borderColor={'red'}
              width={150}
              height={40}
              textColor="black"
              borderWidth={3}
              onPress={() => {
                console.log('Se preciono');
              }}
              backgroundColor={'#ff7b00'}
              backgroundShadow={'#fff200'}
              progress>
              <Text>
                Enviar <Icon name={'send'} size={20} color="black" />
              </Text>
            </AwesomeButton>
          </View>

          {/* <View style={{ flex: 1, flexDirection: 'column' }}> */}
          {/* <View> */}
          <View style={{top: 80}}>
            <Text
              style={{width: 250, fontSize: 20, color: 'black'}}
              adjustsFontSizeToFit={true}
              numberOfLines={2}>
              Porfavor revise su correo e inserte la clave que enviamos Att: El
              equipo de LUEMB
            </Text>
          </View>
          <OTPInputView
            style={{
              top: 100,
              width: 330,
              height: 120,
              zIndex: 1,
              backgroundColor: 'black',
              borderRadius: 90,
              padding: 40,
              marginLeft: 40,
              marginRight: 40,
            }}
            pinCount={5}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styless.underlineStyleBase}
            codeInputHighlightStyle={styless.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />

          <View style={{top: 80, zIndex: 2, width: 150, height: 40}}>
            <AwesomeButton
              backgroundDarker={'#fff200'}
              borderColor={'red'}
              width={150}
              height={40}
              borderRadius={30}
              textColor="black"
              borderWidth={1.5}
              onPress={() => {
                console.log('Se preciono');
              }}
              backgroundColor={'#ff7b00'}
              backgroundShadow={'#fff200'}
              progress>
              <Text style={{fontWeight: 'bold'}}>
                Validar <Icon name={'key'} size={20} color="black" />
              </Text>
            </AwesomeButton>
          </View>
          {/* </View> */}
        </View>
        <Image
          style={{
            height: 100,
            width: 100,
            position: 'absolute',
            top: 10,
            right: 0,
            borderRadius: 90,
            zIndex: 7,
          }}
          source={require('./Navigation/Dranwable/TabsDraws/Icon/MyLogo.png')}></Image>
      </View>
    </SafeAreaView>
  );
}

export default RecuperateScreen;

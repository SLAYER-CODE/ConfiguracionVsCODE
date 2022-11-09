import React from 'react';
import {Animated, SafeAreaView, StyleSheet, Text} from 'react-native';
import {View} from 'react-native-animatable';
import {RNCamera} from 'react-native-camera';
import {styles} from '../Stylos/Styles';

import ModelView from 'react-native-gl-model-view';
import AxisPad from 'react-native-axis-pad';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

interface typeAnimation {
  rotateX: Animated.Value;
  rotateZ: Animated.Value;
  fromXY: any[];
  valueXY: any[];
}

function Preview() {
  const stylespwd = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      width: 500,
      height: 500,
      position: 'absolute',
      borderWidth: 20,
      zIndex: 1000,
    },
    view: {
      flex: 1,
      backgroundColor: 'red',
    },
    buttons: {
      height: 50,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    button: {
      padding: 5,
      borderWidth: 1,
      borderColor: 'red',
      borderRadius: 5,
      textAlign: 'center',
      fontSize: 12,
    },
  });

  const [state, setState] = React.useState<typeAnimation>({
    rotateX: new Animated.Value(0),
    rotateZ: new Animated.Value(0),
    fromXY: [500, 500],
    valueXY: [500, 500],
  });

  const AnimatedModelView = Animated.createAnimatedComponent(ModelView);
  let {rotateZ, rotateX, fromXY} = state;

  // const onMoveEnd = () => {
  //   setState({
  //     ...state,
  //     fromXY: undefined,
  //   });
  // };

  const [scale, setscale] = React.useState<Animated.Value>(
    new Animated.Value(-1),
  );

  const onMove = e => {
    console.log(e);
    let {pageX, pageY} = e.nativeEvent,
      {rotateX, rotateZ, fromXY, valueXY} = state;

    if (state.fromXY == undefined || state.valueXY == undefined) {
      setState({
        ...state,
        fromXY: [pageX, pageY],
        valueXY: [(rotateZ as any).__getValue(), (rotateX as any).__getValue()],
      });
    } else {
      rotateZ.setValue(valueXY![0] + (pageX - fromXY![0]) / 2);
      rotateX.setValue(valueXY![1] + (pageY - fromXY![1]) / 2);
    }
    // setpage({pageX,pageY});
  };

  const setSliderValue = (e: any) => {
    scale.setValue(e[0]);
  };
  return (
    <>
      <SafeAreaView
        style={[styles.containerAbsolute]}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 100,
            bottom: 50,
            borderRadius: 50,
            right: 50,
            borderWidth: 5,
            position: 'absolute',
            zIndex: 10,
          }}>
          <AxisPad
            resetOnRelease={false}
            autoCenter={true}
            size={100}
            handlerSize={50}
            onValue={({x, y}) => {
              rotateX.setValue(state.valueXY![1] + (x * fromXY![1]) / 4);
              rotateZ.setValue(state.valueXY![0] + (y * fromXY![0]) / 4);
            }}
          />
        </View>

        <View style={{position: 'absolute', left: 50, top: 50, zIndex: 5}}>
          <MultiSlider
            enableLabel
            max={-1}
            
            min={-40}
            step={0.01}
            allowOverlap={false}
            onValuesChange={setSliderValue}
            values={[0.2]}
            isMarkersSeparated={true}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 50,
            left: 20,
            width: 100,
            height: 30,
            zIndex: 5,
          }}>
          <Text style={{top: -20, fontWeight: 'bold', fontSize: 20}}>
            Controles
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'column',
              flexWrap: 'wrap',
            }}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#FFFFFF33"
              style={{height: 45, width: 45, alignItems: 'center'}}
              onPress={() => {
                rotateZ.setValue((rotateZ as any).__getValue() - 15.5);
              }}>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: '#000000',
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>
                  <Icon name="caretleft" size={40} color="orange" />{' '}
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#FFFFFF33"
              style={{height: 45, width: 45, alignItems: 'center'}}
              onPress={() => {
                // PubNombre.current?.focus()
                rotateZ.setValue((rotateZ as any).__getValue() + 15.5);
              }}>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: '#000000',
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>
                  <Icon name="caretright" size={40} color="orange" />{' '}
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#FFFFFF33"
              style={{height: 45, width: 45, alignItems: 'center'}}
              onPress={() => {
                // PubNombre.current?.focus()
                rotateX.setValue((rotateX as any).__getValue() + 15.5);
              }}>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: '#000000',
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>
                  <Icon name="caretdown" size={40} color="orange" />{' '}
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#FFFFFF33"
              style={{height: 45, width: 45, alignItems: 'center'}}
              onPress={() => {
                // PubNombre.current?.focus()
                rotateX.setValue((rotateX as any).__getValue() - 15.5);
              }}>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: '#000000',
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>
                  <Icon name="caretup" size={40} color="orange" />{' '}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <AnimatedModelView
          model={{
            uri: 'Violin.obj',
          }}
          texture={{
            uri: 'ViolinDiffuseMap.jpg',
          }}
          onStartShouldSetResponder={() => true}
          onResponderMove={onMove}
          animate={!!fromXY}
          //Animacion de coleccion de datos Scaladados
          scale={0.05}
          rotateX={rotateX}
          rotateZ={rotateZ}
          translateZ={scale}
          style={stylespwd.container}
        />
        <RNCamera
          style={[{flex: 1, zIndex: 0, width: '90%',margin:30,marginTop:50, overflow: 'hidden'}]}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}></RNCamera>
      </SafeAreaView>
    </>
  );
}

export default Preview;

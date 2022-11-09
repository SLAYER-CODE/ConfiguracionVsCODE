import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import { styles } from '../Stylos/Styles';

function Contratados() {
  return (
    <SafeAreaView
      style={[styles.containerAbsolute, { paddingTop: 70, backgroundColor: '#ff8000' }]}>
      <View style={{}}>
        <View style={{
          flex: 1, width: "100%",
          flexDirection: 'column',
        }}>
          {Array(20)
            .fill(1)
            .map((_, i) => {
              return <View style={{
                alignSelf: "center", flexDirection: 'row',
                margin: 5, borderBottomColor: "black", backgroundColor: "#ffffff70"
                , borderTopEndRadius: 30,borderBottomLeftRadius:20, borderWidth: 1, width: 380, flexBasis: 75, alignContent: "center", justifyContent: "space-between", alignItems: "flex-start"
              }}>
                <View style={{ margin: 10, flex: 0, justifyContent: "center", alignContent: "center", alignItems: "center", backgroundColor: "red", width: 50, height: 50, borderRadius: 50 }}>
                </View>
                <View style={{position:"absolute",right:0,top:-10,flexDirection:"row"}}>
                  <AwesomeButton
                  progress
                  springRelease
                  style={{height: 39}}
                  backgroundDarker={'#fffb0060'}
                  borderColor={'aqua'}
                  width={90}
                  height={40}
                  borderTopLeftRadius={30}
                  borderBottomLeftRadius={30}
                  textColor="black"
                  borderWidth={1.5}
                  backgroundColor={'#fffb0060'}
                  backgroundShadow={'#ff000080'}>
                  Editar
                  {/* Prototipo M2B para la catalogación y recolección de datos implementado en puntos de servicios  */}
                </AwesomeButton>
                <AwesomeButton
                  progress
                  springRelease
                  style={{height: 39}}
                  backgroundDarker={'#fffb0060'}
                  borderColor={'red'}
                  width={90}
                  height={40}
                  borderTopRightRadius={30}
                  borderBottomRightRadius={30}
                  textColor="black"
                  borderWidth={1.5}
                  backgroundColor={'#fffb0060'}
                  backgroundShadow={'#ff0000'}>
                  Eliminar
                </AwesomeButton>
                </View>
                <View style={{ margin:5,flexDirection: "column",flexBasis:300 }}>
                  <Text style={{ position: 'relative', width: "100%", borderRadius: 20, bottom: 0 ,fontWeight:'bold'}}>
                    Nombre:
                  </Text>
                  <Text style={{fontWeight:'bold', position: 'relative', width: "100%", borderRadius: 20, bottom: 0 }}>
                    Descripccion:
                  </Text>
                  <View style={{ flexDirection: "row",flex:0 }}>
                    <Text style={{ fontWeight:'bold',flex:1,position: 'relative', borderRadius: 20, bottom: 0 }}>
                      Telefone:
                    </Text>
                    <Text style={{fontWeight:'bold', flex:1,position: 'relative',borderRadius: 20, bottom: 0 }}>
                      Raiting:
                    </Text>
                  </View>
                </View>
              </View>;
            })}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Contratados;

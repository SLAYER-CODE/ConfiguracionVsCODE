import { useQuery } from '@apollo/client';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Image } from 'react-native-animatable';
import PagerView from 'react-native-pager-view';
import AwesomeButton from 'react-native-really-awesome-button';
import { GET_PRODUCTO_PROFILE_CONTRATE } from '../GraphQl/Queries';
import { Get_Producto_Profile_Contrate, Get_Producto_Profile_Contrate_ProductsProfileContrate, Get_Producto_Profile_Contrate_ProductsProfileContrate_image_realation } from '../GraphQl/Types';
import { styles } from '../Stylos/Styles';
import IconAwesone from 'react-native-vector-icons/FontAwesome';

function Contratados() {
    const { loading, error, data, refetch } = useQuery<Get_Producto_Profile_Contrate>(GET_PRODUCTO_PROFILE_CONTRATE);
  return (
    <SafeAreaView
      style={[styles.containerAbsolute, { backgroundColor: '#ff8000' }]}>
      {
          data?.ProductsProfileContrate.map((product:Get_Producto_Profile_Contrate_ProductsProfileContrate,index)=>{
            {
                return <View style={{
                    position: 'relative', margin: 5, marginLeft: 10, borderBottomColor: "black"
                    , borderRadius: 20, borderWidth: 10, flex: 0, height: 200, width: 150,borderColor:'black'
                }}>
                    {console.warn(product.image_realation)}
                    {product.image_realation != undefined && product.image_realation.length != 0 ? (
                        <PagerView

                            transitionStyle='scroll'
                            initialPage={0}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}>
                            {product.image_realation
                                .map((publication: Get_Producto_Profile_Contrate_ProductsProfileContrate_image_realation, itemcount) => {
                                    console.log(product)
                                    return (

                                        <View key={itemcount} style={{
                                            borderRadius: 30,

                                        }}>
                                            <Image
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: 20,
                                                }}
                                                source={{ uri: publication.image_name?.toString() }}
                                            />
                                        </View>
                                    );
                                })}
                        </PagerView>
                    ) : (
                        <Image
                            style={{ width: '100%', height: "100%", backgroundColor: 'red', borderRadius: 20 }}
                            source={require('../Navigation/Dranwable/TabsDraws/Icon/MyLogo.png')}
                        />
                    )}


                    <View style={{ width: "100%", height: 80, position: 'absolute', borderRadius: 20, backgroundColor: "#ffffff60", bottom: 0, flex: 1 }}>
                        <Text style={{ paddingLeft: 10, paddingRight: 10, top: 0, fontWeight: 'bold', fontSize: 14 }}>
                            {product.product_name}

                        </Text>
                        <Text style={{ paddingLeft: 10, paddingRight: 10, borderRadius: 20, bottom: 0, fontSize: 10, fontStyle: 'italic' }}>
                            {product.description}
                        </Text>
                    </View>
                    <Text style={{ paddingLeft: 10, paddingRight: 10, position: 'absolute', right: 0, borderBottomRightRadius: 30, backgroundColor: "white", bottom: 0 }}>
                        {product.price_unity}
                    </Text>
                </View>;
            }
          })
      }

<AwesomeButton
        backgroundShadow={'#fffb00'}
        backgroundColor={'cyan'}
        backgroundDarker={'#ff0000'}
        borderColor={'#fffb00'}
        width={60}
        height={60}
        borderRadius={60}
        textColor="black"
        borderWidth={1.5}
        style={{ position: 'absolute',bottom:90,right:10 }}
        onPress={() => {
          refetch()
        }}>
        <Text style={{ fontWeight: 'bold' }}><IconAwesone name='refresh' size={30}></IconAwesone></Text>
      </AwesomeButton>
    </SafeAreaView>
  );
}

export default Contratados;

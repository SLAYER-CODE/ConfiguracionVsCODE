import { useQuery } from '@apollo/client';
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { ScrollView } from 'react-native'
import { Icon } from 'react-native-elements';
import { client } from '../../apollo.config';
import { GET_CATEGORIES } from '../GraphQl/Queries';
import { GetCategories } from '../GraphQl/Types';
import { styles } from '../Stylos/Styles'
// import Preview from './Preview'

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
function Categorias() {

    const { loading, error, data, refetch } = useQuery<GetCategories>(GET_CATEGORIES);

    return (
        <SafeAreaView style={[styles.containerAbsolute, { padding: 20, backgroundColor: '#ff9900' }]}>
            <ScrollView horizontal={false} scrollEnabled={true} style={{ width: "100%", flex: 1, flexDirection: 'column', marginTop: 30 ,backgroundColor: '#e67f1250',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center'}}>

                {data && data.Categories.length != 0 ? (

                    data.Categories.map((item, res) => {
                        return (
                            <View style={{ padding: 20, height: 150, backgroundColor: 'white', margin: 5, borderRadius: 10, borderTopColor: "#000", borderBottomWidth: 2, borderStyle: "dashed" }}>
                                <Text>Medicina</Text>
                            </View>
                        )
                    })
                ) :
                    <View style={{}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 60 }}> <IconMaterial size={60} name='border-none-variant' /> Sin categorias</Text>
                    </View>
                }

            </ScrollView>
        </SafeAreaView>
    )
}

export default Categorias

import { useQuery } from '@apollo/client';
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { ScrollView } from 'react-native'
import { client } from '../../apollo.config';
import { GET_CATEGORIES } from '../GraphQl/Queries';
import { GetCategories } from '../GraphQl/Types';
import { styles } from '../Stylos/Styles'
// import Preview from './Preview'


function Categorias() {

    const { loading, error, data, refetch } = useQuery<GetCategories>(GET_CATEGORIES);

    return (
        <SafeAreaView style={[styles.containerAbsolute, { padding: 20, backgroundColor: '#ff9900' }]}>
            <ScrollView horizontal={false} scrollEnabled={true} style={{ width: "100%", flex: 1, flexDirection: 'column', marginTop: 30 }}>

                {data && data.Categories.length != 0 ? (

                    data.Categories.map((item, res) => {
                        return (
                            <View style={{ padding: 20, height: 150, backgroundColor: 'white', margin: 5, borderRadius: 10, borderTopColor: "#000", borderBottomWidth: 2, borderStyle: "dashed" }}>
                                <Text>Medicina</Text>
                            </View>
                        )
                    })
                ) : 
                    <View>
                        <Text>Sin Items</Text>
                    </View>
                }

            </ScrollView>
        </SafeAreaView>
    )
}

export default Categorias

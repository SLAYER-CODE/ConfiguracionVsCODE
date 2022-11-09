import { useQuery } from '@apollo/client';
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { ScrollView } from 'react-native'
import { client } from '../../apollo.config';
import { GET_CATEGORIES } from '../GraphQl/Queries';
import { GetCategories } from '../GraphQl/Types';
import { styles } from '../Stylos/Styles'
// import Preview from './Preview'

const { loading, error, data, refetch } = useQuery<GetCategories>(GET_CATEGORIES);

function Categorias() {


    return (
        <SafeAreaView style={[styles.containerAbsolute, { padding: 20, backgroundColor: '#ff9900' }]}>
            <ScrollView horizontal={false} scrollEnabled={true} style={{ width: "100%", flex: 1, flexDirection: 'column', marginTop: 30 }}>
          


            </ScrollView>
        </SafeAreaView>
    )
}

export default Categorias

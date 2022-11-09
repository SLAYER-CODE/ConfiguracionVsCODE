import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Text, SafeAreaView, StyleSheet, Keyboard, TextInput, View, TouchableOpacity, FlatList, ListRenderItem, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { FilledTextField, OutlinedTextField, TextField } from 'rn-material-ui-textfield'
import { GET_PRODUCTO } from '../../../GraphQl/Queries'
import { GetCategories, Get_Producto, Get_Producto_Products } from '../../../GraphQl/Types'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../../../Stylos/Styles'

import AntDesingIcon from 'react-native-vector-icons/FontAwesome'
import { Button } from 'react-native'
import PagerView from 'react-native-pager-view'
export const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setCLicked }) => {
    return (
        <View style={styler.container}>
            <View
                style={
                    clicked
                        ? styler.searchBar__clicked
                        : styler.searchBar__unclicked
                }
            >
                {/* search Icon */}
                <AntDesingIcon
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                {/* Input field */}
                <TextInput
                    style={styler.input}
                    placeholder="Search"
                    placeholderTextColor={"grey"}
                    value={searchPhrase}
                    onChangeText={setSearchPhrase}
                    onFocus={() => {
                        setCLicked(true);
                    }}
                />
                {/* cross Icon, depending on whether the search bar is clicked or not */}
                {clicked && (
                    <AntDesingIcon name="close" size={20} color="black" style={{ padding: 1 }} onPress={() => {
                        setSearchPhrase("")
                    }} />
                )}
            </View>
            {/* cancel button, depending on whether the search bar is clicked or not */}
            {clicked && (
                <View style={{ marginLeft: 25 }}>
                    <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss();
                            setCLicked(false);
                        }}
                    ><Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center', marginBottom: 5 }}>Cancelar</Text></TouchableOpacity>
                </View>
            )}
        </View>
    );
};

function SearchTab() {
    const { loading, error, data, refetch } = useQuery<Get_Producto>(GET_PRODUCTO);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [fakeData, setFakeData] = useState();

    const renderItem: ListRenderItem<Get_Producto_Products> = ({ item }) => {
        if (item.product_name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {

            return (
                <View style={{ flexDirection: 'row' }}>
                    {item.image_realation != undefined ? (

                        <PagerView
                            transitionStyle='curl'
                            initialPage={0}
                            style={{
                                zIndex: 1,
                                width: 100,
                                height: 100,
                                borderWidth: 1,
                                borderBottomStartRadius: 30,
                                borderBottomEndRadius: 30,
                            }}>
                            {item.image_realation?.map((image, index) => {
                                { console.log("primero") }
                                return (<View key={index} style={{ backgroundColor: "black", width: 100, height: 100 }}>
                                    <Image style={{ width: 100, height: 100 }}
                                        source={{ uri: image.image_name?.toString() }}
                                    />
                                </View>)
                            })}
                        </PagerView>
                        ):null
                    }
                    <View style={stylesItem.item}>
                        <Text style={stylesItem.title}>{item.product_name}</Text>
                        <Text style={stylesItem.title}>{item.description}</Text>
                        <Text style={stylesItem.title}>{item.old_price}</Text>

                    </View>

                </View>
            )
        }
    };
    return (
        <SafeAreaView style={[styles.containerAbsolute, { backgroundColor: '#e67f1250', paddingTop: 30 }]}>
            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setCLicked={setClicked}
            />
            {/* Mapeo de listas Ni bien escribas */}
            <FlatList data={data?.Products} renderItem={renderItem}
                keyExtractor={(item) => item.product_id}  ></FlatList>
        </SafeAreaView>
    )
}

const styler = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: "row",
        width: "95%",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: "row",
        width: "70%",
        alignItems: "center",
    },
    input: {
        fontSize: 20,
        marginLeft: 10,
        width: "90%",
        tintColor: "red"
    }
})
const stylesItem = StyleSheet.create({
    list__container: {
        margin: 10,
        height: "85%",
        width: "100%",
    },
    item: {
        margin: 10,
        borderBottomWidth: 2,
        borderColor: 'black'
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
    },
});
export default SearchTab

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AppIndex from './src/Component/index';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {appclient} from './src/apollo/client';
import {Settings} from 'react-native-fbsdk-next';
import {MMKV} from 'react-native-mmkv';
import MapboxGL from '@rnmapbox/maps';

export const storagemkv = new MMKV();
const App = () => {
  Settings.initializeSDK();
  const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidGlvcGF6aGMiLCJhIjoiY2tuYWoydnA1MHRrYzJ3cGpvaWx1aW92NCJ9.xS5kjuxwEodkv-Y6iqRGhg'
  MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);
  return (
    <ApolloProvider client={appclient}>
      <Fragment>
        <AppIndex />
      </Fragment>
    </ApolloProvider>
  );
};
export default App;

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

export const storagemkv = new MMKV();
const App = () => {
  Settings.initializeSDK();
  return (
    <ApolloProvider client={appclient}>
      <Fragment>
        <AppIndex />
      </Fragment>
    </ApolloProvider>
  );
};
export default App;

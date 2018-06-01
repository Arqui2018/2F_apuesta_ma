import React, { Component } from 'react';
import { Font } from 'expo';
import { ApolloProvider } from 'react-apollo';
import { GraphQLClient } from 'graphql-request';
import { Alert, View } from 'react-native';
import { Spinner } from 'native-base';
import ApolloClient from 'apollo-boost';
import Home from './src/Index/home';
import styles from './src/assets/css/index';

export const client = new ApolloClient({
  uri: 'http://40.112.162.226/graphql',
});

export const clientRequest = new GraphQLClient('http://104.198.91.25/graphql');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentWillMount() {
    try {
      await Font.loadAsync({
        Roboto: require('./node_modules/native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({ fontLoaded: true });
    } catch (err) {
      Alert.alert(err);
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <Spinner color="red" />
        </View>
      );
    }

    return (
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    );
  }
}

import React, { Component } from 'react';
import { AppLoading, Font } from 'expo';
import { ApolloProvider } from 'react-apollo';
import { GraphQLClient } from 'graphql-request';
import { AsyncStorage } from 'react-native';
import ApolloClient from 'apollo-boost';
import Login from './src/Login/login';
import Home from './src/Index/home';

export const client = new ApolloClient({
  uri: 'http://104.42.172.100/graphql'
});

export const clientRequest = new GraphQLClient('http://104.42.172.100/graphql');

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      userIsLoggedIn: false,
    };
  }


  async componentWillMount() {
    try {
      await Font.loadAsync({
        Roboto: require('./node_modules/native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({ fontLoaded: true });
    } catch (e) {
      console.log('error loadin fonts', e);
    }

    try {
      const token = await AsyncStorage.getItem('@MySuperStore:key');
      if (token !== null) {
        this.setState({ userIsLoggedIn: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }

    return (
      <ApolloProvider client={client}>
        {this.state.userIsLoggedIn ? <Home /> : <Login />}
      </ApolloProvider>
    );
  }
}

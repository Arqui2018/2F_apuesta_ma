import React from 'react';
import { AppLoading, Font } from 'expo';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import Login from "./src/Login/login.js";
import Home from "./src/Index/home.js";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

export const client = new ApolloClient({
  uri: 'http://35.194.70.72:4000/graphql'
});

export default class App extends React.Component {

  state = {
    fontLoaded: false,
  };

  async componentWillMount() {
    try {
      await Font.loadAsync({
        'Roboto': require('./node_modules/native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({ fontLoaded: true });
    } catch (e) {
      console.log('error loadin fonts', e);
    }

  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }

    return (
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    );
  }
}

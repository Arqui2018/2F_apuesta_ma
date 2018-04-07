import React from 'react';
import { AppLoading, Font } from 'expo';
import Login from "./src/Login/login.js";

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
      return < AppLoading />;
    }
    return <Login />;
  }
}

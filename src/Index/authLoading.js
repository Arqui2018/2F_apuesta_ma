import React, { Component } from 'react';
import { Alert, AsyncStorage, View } from 'react-native';
import { Spinner } from 'native-base';
import styles from '../assets/css/index';

export default class AuthLoadingScreen extends Component {
  async componentWillMount() {
    try {
      const userToken = await AsyncStorage.getItem('@apuesta:token');
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    } catch (err) {
      Alert.alert(err);
    }
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Spinner />
      </View>
    );
  }
}

import { Button, Container, Content, Form, H2, Text } from 'native-base';
import { Alert, AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import { clientRequest } from '../../App';
import { DESTROY_SESSION } from '../queries';

import Header from '../components/header';
import Footer from '../components/footer';

export default class LogOut extends Component {
  constructor(props) {
    super(props);
    this.removeSession = this.removeSession.bind(this);
  }

  async removeSession() {
    try {
      const token = await AsyncStorage.getItem('@bet:token');
      const data = await clientRequest.request(DESTROY_SESSION, { token });
      const isRemovedSession = data.destroySession.autentication;

      if (isRemovedSession) {
        await AsyncStorage.removeItem('@bet:token');
      }

      this.props.navigation.navigate('AuthLoading');
    } catch (err) {
      Alert.alert(err);
    }
  }

  render() {
    return (
      <Container>

        <Header nameIcon="arrow-back" redirect={() => { this.props.navigation.navigate('Home'); }} />

        <Content padder>
          <H2>¿Esta seguro de cerrar la sesión?</H2>
          <Form>
            <Button block onPress={this.removeSession}>
              <Text>Si</Text>
            </Button>
            <Button block onPress={() => { this.props.navigation.navigate('Home'); }}>
              <Text>No</Text>
            </Button>
          </Form>
        </Content>

        <Footer />

      </Container>
    );
  }
}

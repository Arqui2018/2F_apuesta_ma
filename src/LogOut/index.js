import { Button, Container, Content, Form, H1, Text, View } from 'native-base';
import { Alert, AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import { clientRequest } from '../../App';
import { DESTROY_SESSION } from '../queries';
import { Col, Row, Grid } from 'react-native-easy-grid';

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

      await this.props.navigation.navigate('AuthLoading');
    } catch (err) {
      Alert.alert(err);
    }
  }

  render() {
    return (
      <Container>

        <Header nameIcon="arrow-back" redirect={() => { this.props.navigation.navigate('Home'); }} />

        <Content padder>
          <Text style={{ marginTop: 10, alignSelf: 'center' }}>¿Esta seguro de desea cerrar sesión?</Text>
          <Form>
            <Grid>
              <Col>
                <Button onPress={this.removeSession} rounded danger style={{ marginTop: 25, alignSelf: 'center' }}>
                  <Text>Si</Text>
                </Button>
              </Col>
              <Col>
                <Button onPress={() => { this.props.navigation.navigate('Home'); }} rounded danger style={{ marginTop: 25, alignSelf: 'center' }}>
                  <Text>No</Text>
                </Button>
              </Col>
            </Grid>
          </Form>
        </Content>

        <Footer />

      </Container>
    );
  }
}

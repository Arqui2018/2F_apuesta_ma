import {
  Body,
  Button,
  Container,
  Content,
  Form,
  H2,
  Header,
  Left,
  Icon,
  Item,
  Input,
  Text,
  Title
} from 'native-base';
import { Alert, AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Footer from '../components/Footer';

export default class LogOut extends Component {
  constructor(props) {
    super(props);

    this.removeSession = this.removeSession.bind(this);
  }

  async removeSession() {
    await AsyncStorage.removeItem('token');
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: 'red', paddingTop: getStatusBarHeight(), height: 45 + getStatusBarHeight() }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>
              Apuesta mUNdial
            </Title>
          </Body>
        </Header>

        <Content padder>
          <H2>¿Esta seguro de cerrar la sesión?</H2>
          <Form>
            <Button block onPress={this.removeSession}>
              <Text>Si</Text>
            </Button>
            <Button block onPress={() => this.props.navigation.navigate('Home')}>
              <Text>No</Text>
            </Button>
          </Form>
        </Content>

        <Footer />
      </Container>
    );
  }
}

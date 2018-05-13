import validator from 'validator';
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Item,
  Input,
  Text,
  Title
} from 'native-base';
import { Alert, AsyncStorage } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import React, { Component } from 'react';
import { CREATE_SESSION } from '../queries';
import { clientRequest, client } from '../../App';

import Footer from '../components/footer';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.login = this.login.bind(this);
  }

  login() {
    const user = {
      email: this.state.email.toLowerCase().trim(),
      password: this.state.password.trim(),
    };

    if (!validator.isEmail(user.email)) {
      return Alert.alert('Correo electrónico invalido');
    }
    if (!user.password.length) {
      return Alert.alert();
    }
    

    clientRequest.request(CREATE_SESSION, { user })
      .then(async (data) => {
        data = data.createSession;
        if (!data.autentication) {
          this.setState({ email: '', password: '' });
          Alert.alert('Correo electrónico o contraseña no validos')
        } else {
          await AsyncStorage.setItem('@apuesta:token', data.authentication_token);
          this.props.navigation.navigate('App');
        }
      })
      .catch(() => Alert.alert('Correo electrónico o contraseña no validos'));
  }


  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: 'red', paddingTop: getStatusBarHeight(), height: 45 + getStatusBarHeight() }}>
          <Body>
            <Title style={{ alignSelf: 'center' }}>Apuesta mUNdial</Title>
          </Body>
        </Header>

        <Content padder>
          <Form>
            <Item>
              <Input placeholder="Correo electrónico" value={this.state.email} onChangeText={email => this.setState({ email })} />
            </Item>
            <Item>
              <Input placeholder="Contraseña" value={this.state.password} secureTextEntry onChangeText={password => this.setState({ password })} />
            </Item>
          </Form>
          <Button onPress={this.login} rounded danger style={{ marginTop: 25, alignSelf: 'center' }}>
            <Text>Iniciar sesión</Text>
          </Button>
        </Content>

        <Footer />
      </Container>

    );
  }
}

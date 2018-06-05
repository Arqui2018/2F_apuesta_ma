import validator from 'validator';
import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Label,
  Icon,
  Item,
  Input,
  Text,
  Title,
  View
} from 'native-base';
import { Alert, AsyncStorage, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import React, { Component } from 'react';
import { CREATE_SESSION } from '../queries';
import { clientRequest } from '../../App';

import Footer from '../components/footer';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.login = this.login.bind(this);
    this.socialNetworks = this.socialNetworks.bind(this);
  }

  async login() {
    const user = {
      email: this.state.email.trim().toLowerCase(),
      password: this.state.password.trim(),
    };

    if (!validator.isEmail(user.email)) {
      return Alert.alert('Error', 'Correo electrónico invalido');
    }
    if (user.password.length < 6) {
      return Alert.alert('Error', 'La contraseña debe tener por lo menos 6 caracteres');
    }

    try {
      let data = await clientRequest.request(CREATE_SESSION, { user });
      data = data.createSession;
      if (!data.autentication) {
        this.setState({ email: '', password: '' });
        Alert.alert('Correo electrónico o contraseña no validos');
      } else {
        await AsyncStorage.setItem('@bet:token', data.authentication_token);
        this.props.navigation.navigate('App');
      }
    } catch (err) {
      Alert.alert('Correo electrónico o contraseña no validos');
    }
  }

  socialNetworks() {
    Alert.alert('Lo sentimos', 'Próximamente podrás iniciar sesión con redes sociales');
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
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../assets/icon.png')}
              style={{ width: 100, height: 100 }}
            />
          </View>

          <Form>
            <Item floatingLabel>
              <Label>Correo electrónico</Label>
              <Input value={this.state.email} onChangeText={email => this.setState({ email })} />
            </Item>
            <Item floatingLabel>
              <Label>Contraseña</Label>
              <Input value={this.state.password} secureTextEntry onChangeText={password => this.setState({ password })} />
            </Item>
            <Button onPress={this.login} rounded danger style={{ marginTop: 25, alignSelf: 'center' }}>
              <Text>Iniciar sesión</Text>
            </Button>
          </Form>
          <Button
            iconLeft
            block
            primary
            style={{ marginTop: 25, marginLeft: 10, marginBottom: 10, marginRight: 10 }}
            onPress={this.socialNetworks}
          >
            <Icon name="logo-facebook" />
            <Text>Facebook</Text>
          </Button>
          <Button iconLeft block danger style={{ margin: 10 }} onPress={this.socialNetworks}>
            <Icon name="logo-googleplus" />
            <Text>Google</Text>
          </Button>
          <Button iconLeft block info style={{ margin: 10 }} onPress={this.socialNetworks}>
            <Icon name="logo-twitter" />
            <Text>Twitter</Text>
          </Button>
        </Content>


        <Footer />
      </Container>

    );
  }
}

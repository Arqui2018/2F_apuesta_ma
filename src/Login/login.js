import React from 'react';
import { Image } from "react-native";
import { Container, Header, Title, Content } from 'native-base';
import { Button, Left, Right, Body, Icon, Text, Form, Item } from 'native-base';
import { Input, Label } from 'native-base';
import Footer from '../components/Footer.js';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class Login extends React.Component{
  render(){
    return (
      <Container>
<<<<<<< HEAD
        <Header style={{backgroundColor: "red", paddingTop: getStatusBarHeight(), height: 45 + getStatusBarHeight()}}>
=======
        <Header style={{ backgroundColor: "red" }}>
>>>>>>> 1884437ee84b1a0481238e6df61840ef1b23f7b0
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>
              Apuesta mUNdial
            </Title>
          </Body>

        </Header>
        <Container>

          <Content padder>
            <Form>
              <Item>
                <Input placeholder="Correo electrónico" />
              </Item>
              <Item>
                <Input placeholder="Contraseña" secureTextEntry={true} />
              </Item>
            </Form>
            <Button rounded danger style={{ marginTop: 25, alignSelf: "center" }}>
              <Text>Iniciar sesión</Text>
            </Button>
          </Content>

        </Container>

        <Footer />
      </Container>

    );
  }
}

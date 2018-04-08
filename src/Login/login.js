import React from 'react';
import { Image } from "react-native";
import { Container, Header, Title, Content, Footer, FooterTab } from 'native-base';
import { Button, Left, Right, Body, Icon, Text, Form, Item } from 'native-base';
import { Input, Label } from 'native-base';

const imgHead = require("../assets/Ap_mUN.png");

export default class Login extends React.Component{
  render(){
    return (
      <Container>
        <Header style={{backgroundColor: "red"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Image
            source={{ imgHead }}
            style={{
              alignSelf: "stretch"
            }}
          />
          </Body>

        </Header>
        <Container>

          <Content padder>
            <Text style={{alignSelf: "center"}} >
              ¡¡Welcome!!
            </Text>
            <Form>
              <Item>
                <Input placeholder="Username" />
              </Item>
              <Item>
                <Input placeholder="Password" secureTextEntry={true} />
              </Item>
            </Form>
            <Button rounded danger style={{ marginTop: 25, alignSelf: "center" }}>
              <Text>Sign In</Text>
            </Button>
          </Content>

        </Container>

        <Footer>
          <FooterTab style={{backgroundColor: "red"}}>
            <Button iconLeft transparent primary>
              <Icon name='beer' />
            </Button>

          </FooterTab>
        </Footer>
      </Container>

    );
  }
}

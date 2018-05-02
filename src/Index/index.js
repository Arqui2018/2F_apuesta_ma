import React, { Component } from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  FooterTab ,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Text,
  Title
} from 'native-base';
import { Image, View } from 'react-native';
import Footer from '../components/Footer.js';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class index extends Component {

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: "red", paddingTop: getStatusBarHeight(), height: 45 + getStatusBarHeight()}}>

          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>
              Apuesta mUNdial
            </Title>
          </Body>
        </Header>

        <Content padder>
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Image
              source={require('../assets/copa.png')}
              style={{height: 380, width: "100%" }}
            />
          </View>
        </Content>
        <Footer />

      </Container>
    );
  }
}

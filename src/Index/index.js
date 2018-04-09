import React from 'react';
import { Container, Header, Title, Content, Footer, FooterTab } from 'native-base';
import { Button, Left, Right, Body, Icon, Text, Form, Item } from 'native-base';
import { Input, Label } from 'native-base';
import { Image, View } from 'react-native';

export default class index extends React.Component{

  render(){
    return (
      <Container>
        <Header style={{backgroundColor: "red"}}>
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
        <Container>
          <Content padder>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Image
                source={require('../assets/copa.png')}
                style={{height: 380, width: "100%" }}
              />
            </View>
          </Content>
        </Container>
        <Footer>
          <FooterTab style={{backgroundColor: "red"}}>
            <Button iconLeft transparent light>
              <Icon name='beer'/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

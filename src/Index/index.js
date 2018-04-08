import React from 'react';
import { Container, Header, Title, Content, Footer, FooterTab } from 'native-base';
import { Button, Left, Right, Body, Icon, Text, Form, Item } from 'native-base';
import { Input, Label } from 'native-base';

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
              Apuesta MUNdial
            </Title>
          </Body>

        </Header>
        <Container>

          <Content padder>
            <Text style={{alignSelf: "center"}} >
              ¡¡Welcome!!
            </Text>
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

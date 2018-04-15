import React, { Component } from 'react';
import { Header, Title, Button, Left, Body, Icon } from 'native-base';
import { Text } from 'react-native';

class Head extends Component {
  render() {
    return (
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
    );
  }
}

export default Head;

import React, { Component } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Header, Title, Button, Left, Body, Icon } from 'native-base';

export default class MyHeader extends Component {
  render() {
    return (
      <Header style={{ backgroundColor: 'red', paddingTop: getStatusBarHeight(), height: 45 + getStatusBarHeight() }}>
        <Left>
          <Button transparent onPress={this.props.redirect}>
            <Icon name={this.props.nameIcon} />
          </Button>
        </Left>
        <Body>
          <Title>Apuesta mUNdial</Title>
        </Body>
      </Header>
    );
  }
}

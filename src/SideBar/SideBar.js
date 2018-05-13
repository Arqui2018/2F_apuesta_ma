import React, { Component } from 'react';
import { Image } from 'react-native';
import { Text, Container, List, Icon, ListItem, Content, Body, Right, Row } from 'native-base';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const routes = {
  Home: 'Inicio',
  Profile: 'Perfil',
  MyBets: 'Mis Apuestas',
  MatchesByDate: 'Apostar',
  LogOut: 'Cerrar Sesión',
};

export default class SideBar extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Row style={{ backgroundColor: 'red', height: getStatusBarHeight() }} />
          <Image
            source={require('../assets/rusia2018.jpg')}
            style={{
              height: 120,
              width: '100%',
              alignSelf: 'stretch',
            }}
          />
          <List
            dataArray={Object.keys(routes)}
            contentContainerStyle={{ marginTop: getStatusBarHeight() }}
            renderRow={data => (
              <ListItem
                icon
                button
                onPress={() => this.props.navigation.navigate(data)}
              >
                <Body>
                  <Text>{routes[data]}</Text>
                </Body>
                <Right><Icon name="md-arrow-dropright" /></Right>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

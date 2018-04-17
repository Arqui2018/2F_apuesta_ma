import { getStatusBarHeight } from 'react-native-status-bar-height';
import React, { Component } from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  H1,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Title
} from 'native-base';
import Footer from '../components/Footer.js';

export default class MatchesByDate extends Component {

  getAllDays() {
    const days = [];
    const week = ['Jueves', 'Viernes', 'Sabado', 'Domingo', 'Lunes', 'Martes', 'Miercoles'];
    for (let i = 14; i <= 28; i += 1) {
      days.push(
        <ListItem
          key={i}
          onPress={() => this.props.navigation.navigate('MatchesByDay', {day: i})}
        >
          <Body>
            <Text>{`${week[(i - 14) % 7]} ${i} de Junio`}</Text>
          </Body>
          <Right><Icon name="md-arrow-dropright" /></Right>
        </ListItem>
      );
    }
    return days;
  }

  render() {
    return (
      <Container>

        <Header style={{ backgroundColor: 'red', paddingTop: getStatusBarHeight(), height: 45 + getStatusBarHeight()}}>
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

        <Content padder>
          <H1 style={{ textAlign: 'center' }}>Fecha</H1>
          <List>
            {this.getAllDays()}
          </List>
        </Content>

        <Footer />

      </Container>
    );
  }
}

import React, { Component } from 'react';
import {
  Body,
  Container,
  Content,
  H1,
  Icon,
  List,
  ListItem,
  Right,
  Text
} from 'native-base';

import Header from '../components/header';
import Footer from '../components/footer';

export default class MatchesByDate extends Component {
  getAllDays() {
    const days = [];
    const week = ['Jueves', 'Viernes', 'Sabado', 'Domingo', 'Lunes', 'Martes', 'Miercoles'];
    for (let i = 14; i <= 28; i += 1) {
      days.push(
        <ListItem
          key={i}
          onPress={() => this.props.navigation.navigate('MatchesByDay', { day: i })}
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
        <Header nameIcon="arrow-back" redirect={() => this.props.navigation.goBack()} />

        <Content>
          <H1 style={{ textAlign: 'center', margin: 25 }}>Fecha de los partidos</H1>
          <List>
            {this.getAllDays()}
          </List>
        </Content>

        <Footer />

      </Container>
    );
  }
}

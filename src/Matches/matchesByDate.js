import React, { Component } from 'react';
import {
  Body,
  Button,
  Container,
  Content,
  H1,
  Icon,
  Input,
  Header,
  Item,
  List,
  ListItem,
  Right,
  Text,
  View
} from 'native-base';
import { SearchBar } from 'react-native-elements'

import MyHeader from '../components/header';
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
        <MyHeader nameIcon="arrow-back" redirect={() => this.props.navigation.goBack()} />

        <Header searchBar rounded style={{ backgroundColor: 'red' }}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Escribe tu equipo favorito" />
            <Icon name="flag" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

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

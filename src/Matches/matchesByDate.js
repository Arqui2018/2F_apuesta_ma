import React, { Component } from 'react';
import {
  ActionSheet,
  Body,
  Button,
  Container,
  Content,
  Header,
  H1,
  H2,
  Icon,
  Item,
  Input,
  Left,
  List,
  ListItem,
  Root,
  Right,
  Spinner,
  Text,
  Title
} from 'native-base';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Alert, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Footer from '../components/Footer.js';

export default class MatchesByDate extends Component {
  getAllDays() {
    const days = [];
    for (let  i = 14; i <= 28; i++)
      days.push(
        <ListItem
          key={i}
          onPress={() => this.props.navigation.navigate('MatchesByDay', {day: i})}
        >
          <Body>
            <Text>{`${i} de Junio`}</Text>
          </Body>
          <Right><Icon name="md-arrow-dropright" /></Right>
        </ListItem>
      );
    return days;
  }

  render() {
    return (
      <Container>

        <Header style={{ backgroundColor: 'red' }}>
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

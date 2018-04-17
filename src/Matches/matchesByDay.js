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
  Spinner,
  Text,
  Title
} from 'native-base';
import Footer from '../components/Footer.js';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default class MatchesByDay extends Component {

  getNameTeam(idTeam) {
    const GET_NAME_TEAM = gql`
      query teamById($idTeam: Int!) {
        teamById(id: $idTeam) {
          name
        }
      }
    `;

    return (
      <Query query={GET_NAME_TEAM} variables={{ idTeam }}>
        {({ loading, error, data }) => {

          if (loading)
            return 'Loading...';
          if (error)
            return `Error!: ${error}`;

          return data.teamById.name.toString();
        }}
      </Query>
    );
  }

  getMatchesByDay() {
    const day = parseInt(this.props.navigation.state.params.day);
    const GET_MATCHES = gql`
      {
        allMatches {
          id
          team_local_id
          team_visitor_id
          date
        }
      }
    `;

    return (
      <Query query={GET_MATCHES}>
        {({ loading, error, data }) => {

          if (loading)
            return <Spinner/>;
          if (error)
            return <Text>Error :(</Text>;

          var matches = [];
          let dayAllMathes;
          data.allMatches.forEach(item => {
            dayAllMathes = parseInt(new Date(item.date).getDate());
            if (dayAllMathes === day)
              matches.push(item);
          });

          return matches.map((match, i) =>
            <ListItem
              key={i}
              onPress={() => this.props.navigation.navigate('Bet', {match, day})}
            >
              <Body>
                <Text>{this.getNameTeam(match.team_local_id)} {` VS `} {this.getNameTeam(match.team_visitor_id)}</Text>
              </Body>
              <Right><Icon name="md-arrow-dropright" /></Right>
            </ListItem>
          );
        }}
      </Query>
    );
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: "red", paddingTop: getStatusBarHeight(), height: 45 + getStatusBarHeight()}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('MatchesByDate')}>
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
          <H1 style={{ textAlign: 'center' }}>Partidos</H1>
          <List>
            {this.getMatchesByDay()}
          </List>
        </Content>

        <Footer />
      </Container>

    );
  }
}

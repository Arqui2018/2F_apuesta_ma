import React, { Component } from 'react';
import {
  ActionSheet,
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
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
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import { client } from '../../App';
import { Alert, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Bet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMatches: null,
      allTeams: null,
      allMatchesByDay: null,
      dayMatches: [],
      isMatches: true,
      isMatchesByDay: false,
      isBet: false,
      teamLocal: '',
      teamVisitor: '',
      amount: '',
      allResults: null,
      goalsLocal: '',
      goalsVisitor: '',
      amount: '',
      well: '',
      bets: '',
      toWin: '',
      results: ''
    };

    this.daysOfWeek = [
      'Jueves',
      'Viernes',
      'Sabado',
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
    ];
  }

  componentWillMount() {

    client
      .query({
        query: gql`
        {
          allMatches {
            id
            team_local_id
            team_visitor_id
            date
          }
        }
        `
      })
      .then(data => {
        this.setState({allMatches: data.data.allMatches});
      });

    client
      .query({
        query: gql`
        {
          allTeams {
            id
            name
          }
        }
        `
      })
      .then(data => {
        this.setState({allTeams: data.data.allTeams});
      });
  }

  getDayMatch(day) {

    var aux = [], tmp;
    for (var match of this.state.allMatches) {
      tmp = new Date(match.date);
      if (day === tmp.getDate())
        aux.push(match);
    }
    this.setState({dayMatches: aux});
    this.setState({isMatches: false, isMatchesByDay: true});
  }

  getMatch(match) {
    this.setState({isMatchesByDay: false, isBet: true});
    var nameTeamLocal = this.state.allTeams[match.team_local_id - 1].name;
    var nameTeamVisitor = this.state.allTeams[match.team_visitor_id - 1].name;
    this.setState({teamLocal: nameTeamLocal, teamVisitor: nameTeamVisitor});
    client
      .query({
        query: gql`
        {
          allResults {
            user_id
            amount
            date
            g_local
            g_visit
            winner
            match_id
            wallet_id
          }
        }`
      })
      .then(data => {
        this.setState({ allResults: data.data.allResults });
      });
  }

  setGoalsLocal(goalsLocal) {
    this.setState({goalsLocal});
    this.calculateStadistics();
  }

  setGoalsVisitor(goalsVisitor) {
    this.setState({goalsVisitor});
    this.calculateStadistics();
  }

  setAmount(amount) {
    this.setState({amount});
    this.calculateStadistics();
  }

  calculateStadistics() {
    if (this.state.goalsLocal.length && this.state.goalsVisitor.length && this.state.amount) {
      Alert.alert('Jhon is the best');
      var auxWell;
      this.state.allResults();
      // well: '',
      // bets: '',
      // toWin: '',
      // results: ''
    }
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: 'red' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name='menu'/>
            </Button>
          </Left>
          <Body>
            <Title>
              Apuesta mUNdial
            </Title>
          </Body>
        </Header>

        <Content padder>
          <H1 style={{ textAlign: 'center' }}>
            {this.state.isMatches && 'Fecha'}
            {this.state.isMatchesByDay && 'Partidos'}
          </H1>
          {
            (this.state.isMatches && this.state.allMatches) &&
              <List>
                {new Array(15).fill().map((item, i) =>
                  <ListItem
                    key={i}
                    onPress={() => this.getDayMatch(i + 14)}
                  >
                    <Body><Text>{`${this.daysOfWeek[i % 7]} ${i + 14} de Junio`}</Text></Body>
                    <Right><Icon name="md-arrow-dropright" /></Right>
                  </ListItem>
                )}
              </List>
          }

          {
            (this.state.isMatchesByDay && this.state.dayMatches.length) &&
              <List>
                {this.state.dayMatches.map((match, i) => {
                  var nameTeamLocal = this.state.allTeams[match.team_local_id - 1].name;
                  var nameTeamVisitor = this.state.allTeams[match.team_visitor_id - 1].name;
                  return (<ListItem
                    key={i}
                    onPress={() => this.getMatch(match)}
                  >
                    <Body>
                      <Text>{`${nameTeamLocal} VS ${nameTeamVisitor}`}</Text>
                    </Body>
                    <Right><Icon name="md-arrow-dropright" /></Right>
                  </ListItem>);
                })}
              </List>
          }

          {
            this.state.isBet &&
              <View>
                <H2 style={{alignSelf: "center"}}>Hora de Apostar!!!</H2>
                <Grid>
                  <Col style={{ marginTop: 15, height: 90 }}>
                    <Text style={{alignSelf: "center"}}>
                      {this.state.teamLocal}
                    </Text>
                    <Item rounded style={{alignSelf: "center"}}>
                      <Input
                        keyboardType = 'numeric'
                        value={this.state.goalsLocal}
                        onChangeText={(goalsLocal) => this.setGoalsLocal(goalsLocal)}
                      />
                    </Item>
                  </Col>

                  <Col style={{ marginTop: 15, height: 90 }}>
                    <Text style={{alignSelf: "center"}}>
                      {this.state.teamVisitor}
                    </Text>
                    <Item rounded style={{alignSelf: "center"}}>
                      <Input
                        keyboardType = 'numeric'
                        value={this.state.goalsVisitor}
                        onChangeText={(goalsVisitor) => this.setGoalsVisitor(goalsVisitor)}
                      />
                    </Item>
                  </Col>
                </Grid>
                <Text style={{alignSelf: "center"}}>Cantidad de Apuesta</Text>
                <Item rounded style={{width: 80, alignSelf: "center"}}>
                  <Input
                    keyboardType = 'numeric'
                    value={this.state.amount}
                    onChangeText={(amount) => this.setAmount(amount)}
                  />
                </Item>

                <Grid>
                  <Col style={{ marginTop: 25 }}>
                    <Text style={{alignSelf: "center"}}>Pozo</Text>
                    <Item rounded>
                      <Input disabled placeholder='well' />
                    </Item>

                    <Text style={{alignSelf: "center"}}>Posible Ganancia</Text>
                    <Item rounded>
                      <Input disabled placeholder='$ to win' />
                    </Item>
                  </Col>

                  <Col style={{ marginTop: 25 }}>
                    <Text style={{alignSelf: "center"}}>Numero de Apuestas</Text>
                    <Item rounded>
                      <Input disabled placeholder='# bets' />
                    </Item>

                    <Text style={{alignSelf: "center"}}>Cantidad de Apuestas</Text>
                    <Item rounded>
                      <Input disabled placeholder='# Results' />
                    </Item>
                  </Col>
                </Grid>
                <Button rounded danger style={{ marginTop: 25, alignSelf: "center" }}>
                  <Text>Apostar</Text>
                </Button>
              </View>
          }
        </Content>

        <Footer>
          <FooterTab style={{ backgroundColor: 'red' }}>
            <Button iconLeft transparent light>
              <Icon name='beer'/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>)
    ;
  }
}

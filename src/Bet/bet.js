import React, { Component } from "react";
import { Container, Header, Content, H1, Text, Icon, Left, Body, Title, Button, Item, Input } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Footer from '../components/Footer.js';
import gql from 'graphql-tag';
import { Mutation, Query } from "react-apollo";
import { client } from '../../App';
import { Alert } from 'react-native';

export default class Bet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allResults: [],
      match: {},
      goalsLocal: '',
      goalsVisitor: '',
      amount: '',
      well: '',
      bets: '',
      toWin: '',
      results: '',
    };
  }

  componentWillMount() {
    const params = this.props.navigation.state.params;
    this.setState(params);
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
    // console.log(client);
  }

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

  async setGoalsLocal(goalsLocal) {
    await this.setState({goalsLocal});
    this.calculateStadistics();
  }

  async setGoalsVisitor(goalsVisitor) {
    await this.setState({goalsVisitor});
    this.calculateStadistics();
  }

  async setAmount(amount) {
    // min 50 max 1 millon
    await this.setState({amount});
    this.calculateStadistics();
  }

  calculateStadistics() {
    if (this.state.goalsLocal.length && this.state.goalsVisitor.length && this.state.amount) {
      var auxWell = 0;
      var auxWellDif = 0;
      var auxBets = 0;
      var auxResults = 0;
      this.state.allResults.forEach(item => {
        if (item.match_id == this.state.match.id) {
          auxWell += item.amount;
          auxBets++;
        }
        if (item.g_local == parseInt(this.state.goalsLocal) && item.g_visit == parseInt(this.state.goalsVisitor)) {
          auxResults++;
        }
        else {
          if (item.match_id == this.state.match.id)
            auxWellDif += item.amount;
        }
      });

      auxWell = parseInt((auxWell + parseInt(this.state.amount)) * 0.95);
      this.setState({well: String(auxWell), bets: String(auxBets), results: String(auxResults)});
      var percentWell = ((parseInt(this.state.amount) * 95) / auxWell) / 100;
      this.setState({toWin: String(parseInt(percentWell * auxWellDif + (parseInt(this.state.amount) * 0.95)))});
    }
  }

  bodyBet() {

    const ADD_RESULT = gql`
      mutation createResult($result: ResultInput!) {
        createResult(result: $result) {
          user_id
        }
      }
    `;

    return (
      <Mutation mutation={ADD_RESULT}>
        {(createResult, { data }) => (
          <Content>

            <H1 style={{alignSelf: "center"}}>Hora de Apostar!!!</H1>
            <Grid>
              <Col style={{ marginTop: 15, height: 90 }}>
                <Text style={{alignSelf: "center"}}>
                  {this.getNameTeam(this.state.match.team_local_id)}
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
                  {this.getNameTeam(this.state.match.team_visitor_id)}
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
                  <Input disabled value={this.state.well} />
                </Item>

                <Text style={{alignSelf: "center"}}>Numero de Apuestas</Text>
                <Item rounded>
                  <Input disabled value={this.state.bets} />
                </Item>
              </Col>

              <Col style={{ marginTop: 25 }}>
                <Text style={{alignSelf: "center"}}>Posible Ganancia</Text>
                <Item rounded>
                  <Input disabled value={this.state.toWin} />
                </Item>

                <Text style={{alignSelf: "center"}}>Mismo marcador</Text>
                <Item rounded>
                  <Input disabled value={this.state.results} />
                </Item>
              </Col>
            </Grid>
            <Button onPress={() => {
              const result = {
                user_id: 1,
                amount: parseInt(this.state.amount),
                g_local: parseInt(this.state.goalsLocal),
                g_visit: parseInt(this.state.goalsVisitor),
                match_id: parseInt(this.state.match.id),
                wallet_id: 6070,
              };


              createResult({ variables: { result }});
              Alert.alert(`I'am the fuck lord`);
              // return
            }} rounded danger style={{ marginTop: 25, alignSelf: "center" }}>
              <Text>Apostar</Text>
            </Button>

          </Content>

      )}
      </Mutation>
    );
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: 'red' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('MatchesByDay', { day: this.props.navigation.state.params.day })}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>
              Apuesta mUNdial
            </Title>
          </Body>
        </Header>

        {this.bodyBet()}

        <Footer />
      </Container>
    );
  }
};

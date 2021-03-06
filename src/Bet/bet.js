import React, { Component } from 'react';
import { Container, Header, Content, H1, Text, Icon, Left, Body, Title, Button, Item, Input } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Footer from '../components/Footer.js';
import gql from 'graphql-tag';
import Slider from 'react-native-slider';
import { Mutation, Query } from "react-apollo";
import { client } from '../../App';
import { Alert, View, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

function locale(number) {
  return '$' + number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});


export default class Bet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allResults: [],
      match: {},
      goalsLocal: '',
      goalsVisitor: '',
      amount: 10000,
      well: '0',
      bets: 0,
      toWin: '0',
      results: 0,
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
    await this.setState({ goalsLocal });
    this.calculateStadistics();
  }

  async setGoalsVisitor(goalsVisitor) {
    await this.setState({ goalsVisitor });
    this.calculateStadistics();
  }

  async setAmount(amount) {
    await this.setState({ amount });
    this.calculateStadistics();
  }

  calculateStadistics() {
    if (this.state.goalsLocal && this.state.goalsVisitor) {

      let count = 0;
      let betWithMatch = 0;
      let pool = 0;
      let sum = parseInt(this.state.amount, 10);
      const goalsLocal = parseInt(this.state.goalsLocal, 10);
      const goalsVisitor = parseInt(this.state.goalsVisitor, 10);
      const results = this.state.allResults;
      const amount = parseInt(this.state.amount, 10);


      for (const bet of results) {
        if (this.state.match.id === bet.match_id) {
          betWithMatch++;
          if (bet.g_local === goalsLocal && bet.g_visit === goalsVisitor) {
            sum += bet.amount;
            count++;
          } else {
            pool += bet.amount;
          }
        }
      }

      const commission = amount / sum;
      const ourWell = (sum + pool) * 0.9;
      pool *= 0.9; // 10% to the house
      const toWin = parseInt(pool * commission + parseInt(this.state.amount * 0.9));
      this.setState({
        well: ourWell,
        results: count,
        bets: betWithMatch,
        toWin: toWin,
      });
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

    const UPDATE_WALLET = gql`
      mutation updateWallet($wallet: WalletInput!){
        updateWallet(id: 1, wallet: $wallet) {
          balance
        }
      }
    `;

    return (
      <Mutation mutation={ADD_RESULT}>
        {(createResult, { data }) => (
          <Mutation mutation={UPDATE_WALLET}>
            {updateWallet => (
              <Content>

                <H1 style={{ marginTop: 10, alignSelf: 'center' }}>Hora de Apostar!!!</H1>
                <Grid>
                  <Col style={{ marginTop: 15, height: 90 }}>
                    <Text style={{ alignSelf: 'center' }}>
                      {this.getNameTeam(this.state.match.team_local_id)}
                    </Text>
                    <Item rounded style={{ alignSelf: 'center' }}>
                      <Input
                        textAlign="center"
                        keyboardType="numeric"
                        value={this.state.goalsLocal}
                        onChangeText={goalsLocal => this.setGoalsLocal(goalsLocal)}
                      />
                    </Item>
                  </Col>

                  <Col style={{ marginTop: 15, height: 90 }}>
                    <Text style={{ alignSelf: 'center' }}>
                      {this.getNameTeam(this.state.match.team_visitor_id)}
                    </Text>
                    <Item rounded style={{ alignSelf: 'center' }}>
                      <Input
                        textAlign="center"
                        keyboardType="numeric"
                        value={this.state.goalsVisitor}
                        onChangeText={goalsVisitor => this.setGoalsVisitor(goalsVisitor)}
                      />
                    </Item>
                  </Col>
                </Grid>
                <Grid>
                  <Col>
                    <View style={styles.container}>
                      <Text style={{ alignSelf: 'center' }}>Cantidad de Apuesta</Text>
                      <Slider
                        value={this.state.amount}
                        onValueChange={amount => this.setAmount(amount)}
                        minimumValue={10000}
                        maximumValue={2000000}
                        step={10000}
                      />
                      <Text style={{ alignSelf: 'center' }}>{locale(this.state.amount)}</Text>
                    </View>
                  </Col>
                </Grid>


                <Grid>
                  <Col style={{ marginTop: 23 }}>
                    <Text style={{ alignSelf: 'center' }}>Pozo</Text>
                    <Item rounded>
                      <Input disabled textAlign="center" value={locale(parseInt(this.state.well, 10))} />
                    </Item>

                    <Text style={{ alignSelf: 'center' }}>Numero de Apuestas</Text>
                    <Item rounded>
                      <Input disabled textAlign="center" value={String(this.state.bets)} />
                    </Item>
                  </Col>

                  <Col style={{ marginTop: 23 }}>
                    <Text style={{ alignSelf: 'center' }}>Posible Ganancia</Text>
                    <Item rounded>
                      <Input disabled textAlign="center" value={locale(parseInt(this.state.toWin, 10))} />
                    </Item>

                    <Text style={{ alignSelf: 'center' }}>Mismo marcador</Text>
                    <Item rounded>
                      <Input disabled textAlign="center" value={String(this.state.results)} />
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
                  const wallet = {
                    balance: -result.amount,
                  };


                  Alert.alert(
                    '¿Esta seguro que sea apostar a este partido?',
                    `El valor de la apuesta es de ${locale(this.state.amount)}`,
                    [
                      {text: 'Cancelar', onPress: () => {}, style: 'cancel'},
                      {text: 'Aceptar', onPress: () => {
                        updateWallet({ variables: { wallet }});
                        createResult({ variables: { result }});
                        Alert.alert('Felicitaciones', 'Apuesta creata Exitosamente');
                        this.props.navigation.navigate('Home'); // return home
                      }},
                      { cancelable: false }
                    ]
                  );

                }} rounded danger style={{ marginTop: 25, alignSelf: "center" }}>
                  <Text>Apostar</Text>
                </Button>

              </Content>


            )}
          </Mutation>
        )}
      </Mutation>
    );
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: 'red', paddingTop: getStatusBarHeight(), height: 45 + getStatusBarHeight() }}>
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

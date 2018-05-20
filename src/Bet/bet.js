import React, { Component } from 'react';
import { Container, Header, Content, H1, Text, Icon, Left, Body, Title, Button, Item, Input } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Footer from '../components/footer';
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

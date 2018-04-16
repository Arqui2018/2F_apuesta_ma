import React from 'react';
import { ListView } from 'react-native';
import { Container, Header, Title, Content } from 'native-base';
import { Button, Body, Icon, Left, Text, Item } from 'native-base';
import { Input, List, ListItem, Row, H1 } from 'native-base';

import Footer from '../components/Footer.js';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { client } from '../../App';

import { getStatusBarHeight } from 'react-native-status-bar-height';

// const imgHead = require("../assets/Ap_mUN.png");
// const datas = [
//   'BRA v GER',
//   'JAP v KOR',
//   'COL v POL',
//   'MEX v ARG',
// ];

export default class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      allResults: [],
    };
  }

  componentWillMount() {
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
        const myBets = [];
        data.data.allResults.forEach(item => {
          if (item.user_id === 1)
            myBets.push(item)
        });
        this.setState({ allResults: myBets });
      });
  }


  // deleteRow(secId, rowId, rowMap) {
  //   rowMap[`${secId}${rowId}`].props.closeRow();
  //   const newData = [...this.state.listViewData];
  //   newData.splice(rowId, 1);
  //   this.setState({ listViewData: newData });
  // }

  getBets() {
    // return this.state.allResults.map((item, i) => (
    //   <ListItem key={i}>
    //     <Body>
    //       <Text>{`${item.g_local + ' ' + item.g_visit}`}</Text>
    //       {/* <Text> {this.getNameTeam(item.g_local)} {` VS `} {this.getNameTeam(item.g_visit)}</Text> */}
    //     </Body>
    //   </ListItem>
    // ));


    const GET_RESULTS = gql`
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
      }
    `;

    return (
      <Query query={GET_RESULTS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;


          const myBets = [];
          data.allResults.forEach(item => {
            if (item.user_id === 1)
              myBets.push(item);
          });

          return myBets.map((item, i) =>
            <ListItem
              key={i}
            >
              <Body>
                <Text>Hello world!!!</Text>
              </Body>
              <Right><Icon name="md-arrow-dropright" /></Right>
            </ListItem>
          );
        }}
      </Query>
    );
  }

  getMatchById() {

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

  getBalance() {

    const GET_BALANCE = gql`
      query walletById($id: Int!) {
        walletById(id: $id) {
          balance
        }
      }
    `;

    return (
      <Query query={GET_BALANCE} variables={{id: 1}}>
        {({ loading, error, data }) => {

          if (loading)
            return 'Loading';
          if (error)
            return `Error!: ${error}`;

          return data.walletById.balance.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }}
      </Query>
    );
  }

  render(){
    return (
      <Container>
        <Header style={{backgroundColor: "red", paddingTop: getStatusBarHeight(), height: 45 + getStatusBarHeight()}}>
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

          <H1 style={{ marginTop: 10, alignSelf: "center" }}>Información personal</H1>
          <List>
            <ListItem>
              <Icon active name="contact" />
              <Body>
                <Text>Example</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Icon active name="logo-usd" />
              <Body>
                <Text>{this.getBalance()}</Text>
              </Body>
            </ListItem>
          </List>

          <H1 style={{ marginTop: 25, alignSelf: "center" }}>Apuestas</H1>
          <List>
            {this.getBets()}
          </List>

        </Content>

        <Footer />

      </Container>
    );
  }
}

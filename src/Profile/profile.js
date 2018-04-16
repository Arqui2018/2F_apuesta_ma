import React from 'react';
import { ListView } from 'react-native';
import { Container, Header, Title, Content } from 'native-base';
import { Button, Body, Icon, Left, Text, Item } from 'native-base';
import { Input, List, ListItem, Row, H1 } from 'native-base';

import Footer from '../components/Footer.js';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const imgHead = require("../assets/Ap_mUN.png");
const datas = [
  'BRA v GER',
  'JAP v KOR',
  'COL v POL',
  'MEX v ARG',
];

export default class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: datas,
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
        console.log(data.data.allResults);
      });
  }


  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
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
        <Header style={{backgroundColor: "red"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name='menu' />
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
          

        </Content>

        <Footer />

      </Container>
    );
  }
}

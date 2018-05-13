import React, { Component } from 'react';

import { Alert } from 'react-native';
import { Container, Content, Body, Icon, Text, List, ListItem, H1 } from 'native-base';


import Header from '../components/header';
import Footer from '../components/footer';

import { clientRequest } from '../../App';
import { userData, locale } from '../utilities';
import { WALLET_BY_ID } from '../queries';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Cargando ...',
      email: 'Cargando ...',
      wallet_id: 'Cargando ...',
      balance: 'Cargando ...',
    };
  }

  async componentWillMount() {
    try {
      const data = await userData();
      if (data) {
        this.setState({
          name: data.name,
          email: data.email,
          wallet_id: data.wallet_id,
        });
        const id = parseInt(data.wallet_id, 10);
        const { walletById } = await clientRequest.request(WALLET_BY_ID, { id });
        this.setState({ balance: locale(Number(walletById.balance)) });
      }
    } catch (err) {
      Alert.alert(err);
    }
  }

  render() {
    return (
      <Container>
        <Header nameIcon="arrow-back" redirect={() => this.props.navigation.goBack()} />

        <Content padder>

          <H1 style={{ marginTop: 10, alignSelf: 'center' }}>Información personal</H1>

          <List>
            <ListItem>
              <Icon active name="contact" />
              <Body>
                <Text>{this.state.name}</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Icon active name="ios-mail" />
              <Body>
                <Text>{this.state.email}</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Icon active name="ios-card" />
              <Body>
                <Text>{this.state.wallet_id}</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Icon active name="logo-usd" />
              <Body>
                <Text>{this.state.balance}</Text>
              </Body>
            </ListItem>
          </List>

        </Content>

        <Footer />

      </Container>
    );
  }
}

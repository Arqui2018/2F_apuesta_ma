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
  Icon,
  Left,
  List,
  ListItem,
  Root,
  Spinner,
  Text,
  Title
} from 'native-base';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

export default class Bet extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props.matches);
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
          <H1 style={{ textAlign: 'center' }}>Partidos</H1>

        </Content>

        <Footer>
          <FooterTab style={{ backgroundColor: 'red' }}>
            <Button iconLeft transparent light>
              <Icon name='beer'/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

import React, { Component } from 'react';

import { Container, Content, H1, List, Spinner } from 'native-base';
import { Alert } from 'react-native';

import { ALL_MATCHES } from '../queries';
import { clientRequest } from '../../App';

import Header from '../components/header';
import Footer from '../components/footer';
import ListItemMatch from './listItemMatch';

export default class MatchesByDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayAllMatches: [],
      day: 0,
    };
  }


  async componentWillMount() {
    const { day } = this.props.navigation.state.params;

    try {
      const { allMatches } = await clientRequest.request(ALL_MATCHES);
      const dayAllMatches = allMatches.filter(item => (new Date(item.date).getDate()) === day);
      this.setState({ dayAllMatches, day });
    } catch (err) {
      Alert.alert(err);
    }
  }

  render() {
    return (
      <Container>
        <Header nameIcon="arrow-back" redirect={() => this.props.navigation.navigate('MatchesByDate')} />


        <Content padder>
          <H1 style={{ textAlign: 'center', margin: 25 }}>Partidos</H1>
          <List>
            {this.state.dayAllMatches.length
              ? this.state.dayAllMatches.map(item =>
                  (<ListItemMatch
                    key={item.toString()}
                    match={item}
                    day={this.state.day}
                    navigation={this.props.navigation}
                  />)
                )
              : <Spinner color="red" />
            }
          </List>
        </Content>

        <Footer />
      </Container>
    );
  }
}

import React, { Component } from 'react';

import { Container, Content, H1, Spinner } from 'native-base';
import { Alert } from 'react-native';

import Header from '../components/header';
import Footer from '../components/footer';

import { clientRequest } from '../../App';
import { userData } from '../utilities';
import { RESULT_BY_USER } from '../queries';
import SwipeRow from './swipeRow';

export default class MyBets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myBets: [],
    }
  }

  async componentWillMount() {
    try {
      const { id } = await userData();
      const { resultByUser } = await clientRequest.request(RESULT_BY_USER, { id });
      const myBets = resultByUser.reverse();
      this.setState({ myBets });
    } catch (err) {
      Alert.alert(err);
    }
  }



  render() {
    return (
      <Container>
        <Header nameIcon="arrow-back" redirect={() => { this.props.navigation.goBack(); }} />

        <Content>
          <H1 style={{ textAlign: 'center', margin: 25 }}>Mis Apuestas</H1>

          { this.state.myBets.length
            ? this.state.myBets.map((item, index) => (
              <SwipeRow
                key={index}
                match={item}
              />
              ))
            : <Spinner color="red" />
          }

        </Content>


        <Footer />
      </Container>
    );
  }
}

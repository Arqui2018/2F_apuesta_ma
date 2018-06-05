import React, { Component } from 'react';

import { Container, Content, H1, Spinner } from 'native-base';
import { Alert, AsyncStorage } from 'react-native';
import numeral from 'numeral';

import Header from '../components/header';
import Footer from '../components/footer';

import { clientRequest } from '../../App';

import { userData } from '../utilities';
import { RESULT_BY_USER, SESSION_BY_TOKEN, UPDATE_WALLET, DELETE_RESULT } from '../queries';
import SwipeRow from './swipeRow';


export default class MyBets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myBets: [],
    };
    this.deleteBet = this.deleteBet.bind(this);
    this.editBet = this.editBet.bind(this);
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

  deleteBet(id, teams) {
    const amount = parseInt(this.state.myBets.find(item => item.id === id).amount, 10);

    const removeBet = async () => {
      try {
        const token = await AsyncStorage.getItem('@bet:token');
        const { sessionByToken } = await clientRequest.request(SESSION_BY_TOKEN, { token });

        const idUser = parseInt(sessionByToken.id, 10);
        const balance = parseInt(amount * 0.9, 10);
        const updatedWallet = clientRequest.request(UPDATE_WALLET, { id: idUser, wallet: { balance } });
        const removedMyBet = clientRequest.request(DELETE_RESULT, { id });
        await Promise.all([updatedWallet, removedMyBet]);

        const auxCopy = this.state.myBets;
        for (let i = 0; i < auxCopy.length; i += 1) {
          if (auxCopy[i].id === id) {
            auxCopy.splice(i, 1); // remove bet of state
            break;
          }
        }
        this.setState({ myBets: auxCopy });
        Alert.alert('Felicitaciones', 'La apuesta ha sido eliminada exitosamente', [{ text: 'Aceptar' }]);
      } catch (err) {
        Alert.alert(err);
      }
    };

    Alert.alert(
      'Atención',
      `¿Esta seguro que desea eliminar la apuesta con un monto de ${numeral(amount).format('$0,0.00')}?`,
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        { text: 'Aceptar', onPress: removeBet },
      ],
      { cancelable: false },
    );
  }

  editBet(result) {
    this.props.navigation.navigate('Bet', { result });
  }

  render() {
    return (
      <Container>
        <Header nameIcon="arrow-back" redirect={() => { this.props.navigation.goBack(); }} />

        <Content>
          <H1 style={{ textAlign: 'center', margin: 25 }}>Mis Apuestas</H1>

          { this.state.myBets.length
            ? this.state.myBets.map(item => (
              <SwipeRow
                key={JSON.stringify(item)}
                result={item}
                deleteBet={this.deleteBet}
                editBet={this.editBet}
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

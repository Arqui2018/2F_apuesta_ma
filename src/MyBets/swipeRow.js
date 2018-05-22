import React, { Component } from 'react';

import { Text, SwipeRow, View, Icon, Button } from 'native-base';
import { Alert } from 'react-native';


import { clientRequest } from '../../App';
import { nameTeam, locale } from '../utilities';
import { MATCH_BY_ID } from '../queries';

export default class MySwipeRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamLocal: 'Cargando ...',
      teamVisitor: 'Cargando ...',
    };
  }

  async componentWillMount() {
    try {
      const id = Number(this.props.result.match_id);
      const { matchById } = await clientRequest.request(MATCH_BY_ID, { id });
      nameTeam(matchById.team_local_id).then(teamLocal => this.setState({ teamLocal }));
      nameTeam(matchById.team_visitor_id).then(teamVisitor => this.setState({ teamVisitor }));
    } catch (err) {
      Alert.alert(err);
    }
  }

  render() {

    // this.props.navigation.navigate('Bet', { result: this.props.result;
    return (
      <SwipeRow
        leftOpenValue={75}
        rightOpenValue={-75}
        left={
          <Button success onPress={() => this.props.editBet(this.props.result)}>
            <Icon active type="FontAwesome" name="pencil" />
          </Button>
        }
        body={
          <View>
            <Text style={{ paddingLeft: 15 }}>
              {this.state.teamLocal}
              {' vs '}
              {this.state.teamVisitor}
              {'\t\t $'}
              {locale(parseInt(this.props.result.amount, 10))}
            </Text>
          </View>
        }
        right={
          <Button danger onPress={() => this.props.deleteBet(this.props.result.id, this.state)}>
            <Icon active type="FontAwesome" name="trash" />
          </Button>
        }
      />
    );
  }
}

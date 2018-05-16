import React, { Component } from 'react';
import { Body, Icon, ListItem, Right, Text } from 'native-base';

import { nameTeam } from '../utilities';

export default class ListItemMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamLocal: 'Cargando ...',
      teamVisitor: 'Cargando ...',
    };
  }

  componentWillMount() {
    nameTeam(this.props.match.team_local_id).then(teamLocal => this.setState({ teamLocal }));
    nameTeam(this.props.match.team_visitor_id).then(teamVisitor => this.setState({ teamVisitor }));
  }

  render() {
    return (
      <ListItem onPress={() => this.props.navigation.navigate('Bet', { match: this.props.match, day: this.props.day })}>
        <Body>
          <Text>
            {this.state.teamLocal}
            {' vs '}
            {this.state.teamVisitor}
          </Text>
        </Body>
        <Right><Icon name="md-arrow-dropright" /></Right>
      </ListItem>
    );
  }
}

import React, { Component } from 'react';

import { Body, Icon, Text, List, ListItem } from 'native-base';

export default class ListProfile extends Component {
  render() {
    return (
      <List>
        {Object.keys(this.props.data).map(item => (
          <ListItem key={item.toString()}>
            <Icon active name={this.props.data[item].icon} />
            <Body>
              <Text>{this.props.data[item].value}</Text>
            </Body>
          </ListItem>
        ))}
        <ListItem>
          <Icon active name="flag" />
          <Body>
            <Text>Colombia</Text>
          </Body>
        </ListItem>
      </List>
    );
  }
}

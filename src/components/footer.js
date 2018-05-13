import React, { Component } from 'react';
import { Button, Footer, FooterTab, Icon } from 'native-base';

export default class MyFooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab style={{ backgroundColor: 'red' }}>
          <Button iconLeft transparent light>
            <Icon name="beer" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

import React, { Component } from 'react';
import { Button, Footer, FooterTab, Icon, Text } from 'native-base';

class Foot extends Component {
  render() {
    return (
      <Footer>
        <FooterTab style={{ backgroundColor: 'red' }}>
          <Button iconLeft transparent light>
            <Icon name='beer'/>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
};

export default Foot;

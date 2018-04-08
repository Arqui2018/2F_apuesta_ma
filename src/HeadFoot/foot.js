import React from 'react';
import { Footer, FooterTab } from 'native-base';
import { Button, Icon, Text } from 'native-base';

export default class Head extends React.Component{
  render(){
    return(
      <Footer>
        <FooterTab style={{backgroundColor: "red"}}>
          <Button iconLeft transparent primary>
            <Icon name='beer' />
            <Text>Pub</Text>
          </Button>

        </FooterTab>
      </Footer>
    );
  }
}

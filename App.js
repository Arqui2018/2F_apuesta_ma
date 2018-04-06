import React from 'react';
import { Container, Header, Title, Content, Footer, FooterTab } from 'native-base';
import { Button, Left, Right, Body, Icon, Text } from 'native-base';
import { AppLoading, Font } from 'expo';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentWillMount() {
    try {
      await Font.loadAsync({
        'Roboto': require('./node_modules/native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('./node_modules/native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({ fontLoaded: true });
    } catch (e) {
      console.log('error loadin fonts', e);
    }

  }

  render() {
    if (!this.state.fontLoaded) {
      return < AppLoading />;
    }
    return (
      <Container>
        <Header style={{backgroundColor: "red"}}>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>
              Apuesta MUNdial
            </Title>
          </Body>
          
        </Header>
        <Content>

          <Text> Bienvenidos Apuesta MUNdial !!</Text>

        </Content>
        <Footer>
          <FooterTab style={{backgroundColor: "red"}}>
            <Button iconLeft transparent primary>
              <Icon name='beer' />
              <Text>Pub</Text>
            </Button>

          </FooterTab>
        </Footer>
      </Container>

    );
  }
}

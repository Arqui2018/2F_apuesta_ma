import React, { Component } from "react";
import { Container, Header, Footer, FooterTab, Content, ActionSheet } from "native-base";
import { Root, Text, Icon, Left, Body, Title, Button } from "native-base";

var BUTTONS = ["MEX v NIG", "FIN v JAP", "ITA v COL", "Cancel"];
var CANCEL_INDEX = 3;

export default class Bet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Header style={{backgroundColor: "red"}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>
              Apuesta MUNdial
            </Title>
          </Body>

        </Header>

        <Container>
          <Content padder>
            <Root>
              <Button
                onPress={() =>
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    title: "Fechas"
                  },
                  buttonIndex => {
                    this.setState({ clicked: BUTTONS[buttonIndex] });
                  }
                )}
              >
                <Text>FECHA#1</Text>
              </Button>
            </Root>
          </Content>
        </Container>

        <Footer>
          <FooterTab style={{backgroundColor: "red"}}>

            <Button iconLeft transparent primary>
              <Icon name='beer' />
            </Button>

          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

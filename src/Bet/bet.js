import React, { Component } from "react";
import { Container, Header, Footer, FooterTab, Content, H2 } from "native-base";
import { Text, Icon, Left, Body, Title, Button, Item, Input } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';


export default class Bet extends Component {

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


          <Content>
            <H2 style={{alignSelf: "center"}}>Bet Time!!</H2>
            <Grid>
              <Col style={{ marginTop: 15, height: 90 }}>
                <Text style={{alignSelf: "center"}}>Local</Text>
                <Item rounded>
                  <Input placeholder='Local' keyboardType = 'numeric'/>
                </Item>
              </Col>

              <Col style={{ marginTop: 15, height: 90 }}>
                <Text style={{alignSelf: "center"}}>Visit</Text>
                <Item rounded>
                  <Input placeholder='Visit' keyboardType = 'numeric'/>
                </Item>
              </Col>
            </Grid>
            <Text style={{alignSelf: "center"}}>Amount of Bet</Text>
            <Item rounded style={{width: 80 ,alignSelf: "center"}}>
              <Input placeholder='Amount' keyboardType = 'numeric'/>
            </Item>
            <Grid>
              <Col style={{ marginTop: 25 }}>
                <Text style={{alignSelf: "center"}}>Pozo</Text>
                <Item rounded>
                  <Input disabled placeholder='well' />
                </Item>

                <Text style={{alignSelf: "center"}}>$ to win</Text>
                <Item rounded>
                  <Input disabled placeholder='$ to win' />
                </Item>
              </Col>

              <Col style={{ marginTop: 25 }}>
                <Text style={{alignSelf: "center"}}># bets</Text>
                <Item rounded>
                  <Input disabled placeholder='# bets' />
                </Item>

                <Text style={{alignSelf: "center"}}># Results</Text>
                <Item rounded>
                  <Input disabled placeholder='# Results' />
                </Item>
              </Col>
            </Grid>
            <Button rounded danger style={{ marginTop: 25, alignSelf: "center" }}>
              <Text>to bet!</Text>
            </Button>
          </Content>


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

import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Button, Text, Container, List, Icon } from "native-base";
import { ListItem, Content, Left, Body, Right } from "native-base";

const routes = ["Home", "Login"];

export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri:
                "http://infonegocios.biz/uploads/mundialrusia2018.jpg"
            }}
            style={{
              height: 120,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute"
            }}
          />

          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem icon
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Left><Icon name="md-add" /></Left>
                  <Body><Text>{data}</Text></Body>
                  <Right><Icon name="md-arrow-dropright" /></Right>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

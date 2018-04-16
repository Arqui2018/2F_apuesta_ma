import React from 'react';
import { ListView } from 'react-native';
import { Container, Header, Title, Content } from 'native-base';
import { Button, Body, Icon, Left, Text, Item } from 'native-base';
import { Input, List, ListItem, Row } from 'native-base';
import Footer from '../components/Footer.js';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const imgHead = require("../assets/Ap_mUN.png");
const datas = [
  'BRA v GER',
  'JAP v KOR',
  'COL v POL',
  'MEX v ARG',
];

export default class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: datas,
    };
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  render(){
    return (
      <Container>
        <Header style={{backgroundColor: "red", paddingTop: getStatusBarHeight(), height: 45 + getStatusBarHeight()}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>
              Apuesta mUNdial
            </Title>
          </Body>

        </Header>

        <Container>
          <Content padder>

            <Item disabled>
              <Input disabled placeholder='Name User'/>
              <Icon name='information-circle' />
            </Item>

            <Item disabled>
              <Input disabled placeholder='Balance'/>
              <Icon name='information-circle' />
            </Item>

            <Text style={{ marginTop: 25, alignSelf: "center" }}>APUESTAS</Text>
            <List
              dataSource={this.ds.cloneWithRows(this.state.listViewData)}
              renderRow={data =>
                <ListItem>
                  <Text> {data} </Text>
                </ListItem>}
              renderLeftHiddenRow={data =>
                <Button full onPress={() => alert(data)}>
                  <Icon active name="information-circle" />
                </Button>}
              renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                  <Icon active name="trash" />
                </Button>}
              leftOpenValue={75}
              rightOpenValue={-75}
            />
          </Content>
        </Container>

        <Footer />

      </Container>
    );
  }
}

import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { Image, View } from 'react-native';
import Footer from '../components/footer';
import Header from '../components/header';


export default class index extends Component {
  render() {
    return (
      <Container>

        <Header nameIcon="menu" redirect={() => this.props.navigation.navigate('DrawerOpen')} />

        <Content padder>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Image
              source={require('../assets/copa.png')}
              style={{ height: 380, width: '100%' }}
            />
          </View>
        </Content>

        <Footer />

      </Container>
    );
  }
}

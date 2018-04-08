import React, {Component} from 'react';
import {
  ActionSheet,
  Body,
  Button,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  H1,
  Icon,
  Left,
  List,
  ListItem,
  Root,
  Spinner,
  Text,
  Title
} from 'native-base';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const BUTTONS = ['MEX v NIG', 'FIN v JAP', 'ITA v COL', 'Cancel'];
const CANCEL_INDEX = 3;

export default class Bet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMatches: null,
      days: null,
    };

    this.month = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembe',
      'Octubre',
      'Noviembe',
      'Diciembre'
    ];

    this.days = [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
      'Domingo'
    ];
  }

  componentWillMount() {
    const getDays = () => (
      <Query
        query={gql `{
            allMatches {
              id
              team_local_id
              team_visitor_id
              date
            }
          }`}
      >

        {
          ({loading, error, data}) => {
            if (loading)
              return <Spinner/>;
            if (error)
              return <Text>Error :(</Text>;

            const allMatches = data.allMatches;
            const matchesByDay = {};
            let dayMatch,
              currentDate;

            // this.setState({allMatches});

            allMatches.forEach(match => {
              currentDate = new Date(match.date);
              dayMatch = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).toString();
              if (!matchesByDay.hasOwnProperty(dayMatch))
                matchesByDay[dayMatch] = [];
              matchesByDay[dayMatch].push(match);
            });

            return Object.keys(matchesByDay).map((item, i) => {
              item = new Date(item);
              return (
                <ListItem key={i}>
                  <Text>{`${this.days[item.getDay()]} ${item.getDate()} de ${this.month[item.getMonth()]}`}</Text>
                </ListItem>);
            });
          }
        }
      </Query>
    );

    this.setState({ days: getDays });
  }

  render() {
    return (<Container>
      <Header style={{ backgroundColor: 'red' }}>
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Icon name='menu'/>
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
          <H1 style={{
              textAlign: 'center'
            }}>Fechas</H1>
          <List>
            {this.state.days()}
          </List>
          {/* <Root>
            <Button onPress={() => ActionSheet.show({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                title: 'Fechas'
              }, buttonIndex => {
                this.setState({clicked: BUTTONS[buttonIndex]});
              })}>
              <Text>FECHA#1</Text>
            </Button>
          </Root> */
          }
        </Content>
      </Container>

      <Footer>
        <FooterTab style={{
            backgroundColor: 'red'
          }}>

          <Button iconLeft transparent light>
            <Icon name='beer'/>
          </Button>

        </FooterTab>
      </Footer>
    </Container>);
  }
}

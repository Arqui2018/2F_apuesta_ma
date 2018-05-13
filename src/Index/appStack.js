import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import IndexScreen from './index';
import ProfileScreen from '../Profile/profile';
import MatchesByDateScreen from '../Matches/matchesByDate';
import MatchesByDayScreen from '../Matches/matchesByDay';
import BetScreen from '../Bet/bet';
import SideBar from '../SideBar/SideBar';

const AppStack = DrawerNavigator(
  {
    Home: { screen: IndexScreen },
    Profile: { screen: ProfileScreen },
    MatchesByDate: { screen: MatchesByDateScreen },
    MatchesByDay: { screen: MatchesByDayScreen },
    Bet: { screen: BetScreen },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);

export default AppStack;

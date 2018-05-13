import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import IndexScreen from './index';
import ProfileScreen from '../Profile/index';
import MatchesByDateScreen from '../Matches/matchesByDate';
import MatchesByDayScreen from '../Matches/matchesByDay';
import BetScreen from '../Bet/bet';
import LogOutScreen from '../LogOut/index';
import SideBar from '../SideBar/SideBar';
import MyBetsScreen from '../MyBets/index';

const AppStack = DrawerNavigator(
  {
    Home: { screen: IndexScreen },
    Profile: { screen: ProfileScreen },
    MyBets: { screen: MyBetsScreen },
    MatchesByDate: { screen: MatchesByDateScreen },
    MatchesByDay: { screen: MatchesByDayScreen },
    Bet: { screen: BetScreen },
    LogOut: { screen: LogOutScreen },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);

export default AppStack;

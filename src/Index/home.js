import React, { Component } from "react";
import IndexScreen from "./index.js";
import LoginScreen from "../Login/login.js";
import ProfileScreen from "../Profile/profile.js";
import MatchesByDateScreen from "../Matches/matchesByDate.js";
import MatchesByDayScreen from "../Matches/matchesByDay.js";
import BetScreen from "../Bet/bet.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";

const HomeRouter = DrawerNavigator(
  {
    Home: { screen: IndexScreen },
    Login: { screen: LoginScreen },
    Profile: { screen: ProfileScreen },
    MatchesByDate: { screen: MatchesByDateScreen },
    Bet: { screen: BetScreen },
    MatchesByDay: { screen: MatchesByDayScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeRouter;

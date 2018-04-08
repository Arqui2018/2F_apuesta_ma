import React, { Component } from "react";
import IndexScreen from "./index.js";
import LoginScreen from "../Login/login.js";
import ProfileScreen from "../Profile/profile.js";
import MatchesScreen from "../Matches/matches.js";
import BetScreen from "../Bet/bet.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";

const HomeRouter = DrawerNavigator(
  {
    Home: { screen: IndexScreen },
    Login: { screen: LoginScreen },
    Profile: { screen: ProfileScreen },
    Matches: { screen: MatchesScreen },
    Bet: { screen: BetScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeRouter;

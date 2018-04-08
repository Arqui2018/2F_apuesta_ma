import React, { Component } from "react";
import IndexScreen from "./index.js";
import LoginScreen from "../Login/login.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";

const HomeRouter = DrawerNavigator(
  {
    Home: { screen: IndexScreen },
    Login: { screen: LoginScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeRouter;

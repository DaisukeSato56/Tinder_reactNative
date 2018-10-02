import React from "react";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Matches from "../screens/Matches";
import { createBottomTabNavigator } from "react-navigation";

export default createBottomTabNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile"
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home"
      }
    },
    Matches: {
      screen: Matches,
      navigationOptions: {
        tabBarLabel: "Matches"
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: "top",
    initialRouteName: "Home",
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      style: {
        height: 100
      }
    }
  }
);

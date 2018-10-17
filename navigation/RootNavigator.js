import React from "react";
import { createStackNavigator } from "react-navigation";
import TabNavigator from "./TabNavigator";

const RootStackNavigator = createStackNavigator({
  Main: {
    screen: TabNavigator
  },
  Chat: {
    screen: Chat
  }
});

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}

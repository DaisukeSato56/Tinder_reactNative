import React from "react";
import styles from "../styles";
import { Text, View, Alert } from "react-native";
import { connect } from "react-redux";
import { login } from "../redux/actions";

class Home extends React.Component {
  state = {};

  componentWillMount() {
    this.props.login("gahaha");
    this.login();
  }

  login = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "173023876951305",
      {
        permission: ["public_profile"]
      }
    );
    if (type === "success") {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
    }
  };

  render() {
    return (
      <View>
        <Text>{this.props.user}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  { login }
)(Home);

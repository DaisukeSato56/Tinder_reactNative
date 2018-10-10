import React from "react";
import styles from "../styles";
import { Text, View, Alert } from "react-native";
import { connect } from "react-redux";
import { login } from "../redux/actions";

class Home extends React.Component {
  state = {};

  componentWillMount() {}

  render() {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

export default connect(
  mapStateToProps,
  { login }
)(Home);

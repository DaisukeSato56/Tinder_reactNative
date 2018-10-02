import React from "react";
import styles from "../styles";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { login } from "../redux/actions";

class Home extends React.Component {
  state = {};

  componentWillMount() {
    this.props.login("gahaha");
  }

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

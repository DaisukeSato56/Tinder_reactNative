import React from "react";
import styles from "../styles";
import { Text, View, Image } from "react-native";
import { connect } from "react-redux";

class Profile extends React.Component {
  state = {};

  componentWillMount() {}

  render() {
    return (
      <View>
        <Text>{this.props.user.name}</Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: this.props.user.photoUrl }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Profile);

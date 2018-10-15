import React from "react";
import styles from "../styles";
import { Text, View, Alert, TouchableOpacity } from "react-native";
import RootNavigator from "../navigation/RootNavigator";
import { connect } from "react-redux";
import { login } from "../redux/actions";
import * as firebase from "firebase";
import firebaseConfig from "../config/firebase";

firebase.initializeApp(firebaseConfig);

class Login extends React.Component {
  state = {};

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.props.login(user);
      }
    });
  }

  login = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "173023876951305",
      {
        permission: ["public_profile"]
      }
    );
    if (type === "success") {
      // firebase credentialをfacebook access token を伴って発行
      const credential = await firebase.auth.FacebookAuthProvider.credential(
        token
      );

      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .catch(error => {
          Alert.alert("Try Again!");
        });
    }
  };

  render() {
    if (this.props.loggedIn) {
      return <RootNavigator />;
    } else {
      return (
        <View style={[styles.container, styles.center]}>
          <TouchableOpacity onPress={this.login.bind(this)}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

export default connect(
  mapStateToProps,
  { login }
)(Login);

import React from "react";
import styles from "../styles";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { uploadImages } from "../redux/actions";

class Profile extends React.Component {
  state = {};

  componentWillMount() {
    this.props.uploadImages(this.props.user.images);
  }

  render() {
    return (
      <View>
        <Text>{this.props.user.name}</Text>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: this.props.user.photoUrl }}
        />
        {this.props.user.images.map((uri, key) => {
          return (
            <TouchableOpacity key={{ key }}>
              <Image style={{ width: 75, height: 75 }} source={{ uri: uri }} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  { uploadImages }
)(Profile);

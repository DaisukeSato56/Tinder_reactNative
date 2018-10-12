import * as firebase from "firebase";
import aws from "../config/aws";
import { ImagePicker, Permissions } from "expo";
import { RNS3 } from "react-native-aws3";
import { Alert } from "react-native";

export const login = user => {
  return dispatch => {
    let params = {
      id: user.uid,
      photoUrl: user.photoURL,
      name: user.displayName,
      aboutMe: "",
      chats: "",
      geocode: "",
      images: [user.photoURL],
      notification: false,
      show: false,
      report: false,
      swipes: { [user.uid]: false },
      token: ""
    };

    firebase
      .database()
      .ref("cards/")
      .child(user.uid)
      .once("value")
      .then(snapshot => {
        if (snapshot.val() !== null) {
          dispatch({ type: "LOGIN", user: snapshot.val(), loggedIn: true });
        } else {
          firebase
            .database()
            .ref("cards/" + user.uid)
            .update(params);
          dispatch({ type: "LOGIN", user: params, loggedIn: true });
        }
      });
  };
};

export const logout = () => {
  return dispatch => {
    firebase.auth().signOut();
    dispatch({ type: "LOGOUT", loggedIn: false });
  };
};

export const uploadImages = images => {
  return async dispatch => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      ImagePicker.launchImageLibraryAsync({ allowsEditing: false }).then(
        result => {
          const array = images;
          if (result.uri !== undefined) {
            const file = {
              uri: result.uri,
              name: result.uri,
              type: "image/png"
            };

            const options = {
              keyPrefix: "uploads/",
              bucket: "testttinder",
              region: "ap-northeast-1",
              accessKey: aws.accessKey,
              secretKey: aws.secretKey,
              successActionStatus: 201
            };

            RNS3.put(file, options).then(response => {
              if (response.status === 201) {
                array.push(response.body.postResponse.location);
                firebase
                  .database()
                  .ref("cards/" + firebase.auth().currentUser.uid + "/images")
                  .set(array);
                dispatch({ type: "UPLOAD_IMAGES", payload: array });
              }
            });
          }
        }
      );
    }
  };
};

export const deleteImage = (images, key) => {
  return dispatch => {
    Alert.alert(
      "Are you sure you want to Delete?",
      "",
      [
        {
          text: "ok",
          onPress: () => {
            const array = images;
            array.splice(key, 1);
            dispatch({ type: "UPLOAD_IMAGES", payload: array });
            firebase
              .database()
              .ref("cards/" + firebase.auth().currentUser.uid + "/images")
              .set(array);
          }
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed")
        }
      ],
      { cancelable: true }
    );
  };
};

export const updateAbout = value => {
  return dispatch => {
    dispatch({ type: "UPDATE_ABOUT", payload: value });
    setTimeout(() => {
      firebase
        .database()
        .ref("cards/" + firebase.auth().currentUser.uid)
        .update({ aboutMe: value });
    }, 3000);
  };
};

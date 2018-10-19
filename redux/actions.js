import * as firebase from "firebase";
import aws from "../config/aws";
import { ImagePicker, Permissions, Locationm, Notifications } from "expo";
import { RNS3 } from "react-native-aws3";
import { Alert } from "react-native";

export const login = user => {
  return dispatch => {
    let params = {
      id: user.uid,
      photoUrl: user.photoURL,
      name: user.displayName,
      aboutMe: " ",
      chats: " ",
      geocode: " ",
      images: [user.photoURL],
      notification: false,
      show: false,
      report: false,
      swipes: { [user.uid]: false },
      token: " "
    };

    firebase
      .database()
      .ref("cards/")
      .child(user.uid)
      .once("value")
      .then(snapshot => {
        if (snapshot.val() !== null) {
          dispatch({ type: "LOGIN", user: snapshot.val(), loggedIn: true });
          dispatch(allowNotification());
        } else {
          firebase
            .database()
            .ref("cards/" + user.uid)
            .update(params);
          dispatch({ type: "LOGIN", user: params, loggedIn: true });
        }
        dispatch(getLoaction());
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

export const getCards = geocode => {
  return dispatch => {
    firebase
      .database()
      .ref("cards")
      .orderByChild("geocode")
      .equalTo(geocode)
      .once("value", snap => {
        const items = [];
        snap.forEach(child => {
          item = child.val();
          item.id = child.key;
          items.push(item);
        });
        dispatch({ type: "GET_CARDS", payload: items });
      });
  };
};

export const getLoaction = () => {
  return dispatch => {
    Permissions.askAsync(Permissions.LOCATION).then(result => {
      if (result) {
        Location.getCurrentPositionAsync({}).then(location => {
          let geocode = Geohash.encode(
            location.coords.latitude,
            location.coords.longitude,
            4
          );
          firebase
            .database()
            .ref("cards/" + firebase.auth().currentUser.uid)
            .update({ geocode: geocode });
          dispatch({ type: "GET_LOCATION", payload: geocode });
        });
      }
    });
  };
};

export const allowNotification = () => {
  return dispatch => {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then(result => {
      if (result.status === "granted") {
        Notifications.getExpoPushTokenAsync().then(token => {
          firebase
            .database()
            .ref("cards/" + firebase.auth().currentUser.uid)
            .update({ token: token });
          dispatch({ type: "ALLOW_NOTIFICATIONS", payload: token });
        });
      }
    });
  };
};

export const sendNotification = (id, name, text) => {
  return dispatch => {
    firebase
      .database()
      .red("cards/" + id)
      .once("value", snap => {
        if (snap.val().token != null) {
          return fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              to: snap.val().token,
              title: name,
              body: text,
              badge: 1
            })
          });
        }
      });
  };
};

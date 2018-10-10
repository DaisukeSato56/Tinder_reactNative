export default (reducers = (
  state = {
    loggedIn: false,
    user: {
      id: "",
      photoUrl: "",
      name: "",
      aboutMe: "",
      chats: "",
      geocode: "",
      images: [],
      notification: false,
      show: false,
      report: false,
      swipes: [],
      token: ""
    }
  },
  action
) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action.loggedIn);
      return { ...state, user: action.user, loggedIn: action.loggedIn };
  }
  return state;
});

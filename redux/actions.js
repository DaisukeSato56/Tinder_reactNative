export const login = input => {
  return dispatch => {
    dispatch({ type: "LOGIN", payload: input });
  };
};

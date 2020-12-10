export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: 'SET_USER',
  INCREASE_USER_SCORE: 'INCREASE_USER_SCORE',
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case actionTypes.INCREASE_USER_SCORE:
      return {
        ...state,
        user: {
          uid: state.user.uid,
          email: state.user.email,
          displayName: state.user.displayName,
          photoURL: state.user.photoURL,
          score: state.user.score + 1,
        },
      };

    default:
      return state;
  }
};

export default UserReducer;

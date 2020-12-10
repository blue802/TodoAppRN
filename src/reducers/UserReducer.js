// import {getUser} from "../components/services/UserStorage"
export const initialState = {
  user: null,
};

export const actionTypes = {
  SET_USER: 'SET_USER',
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;

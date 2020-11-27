export const initialState = {
  todos: null,
};

export const actionTypes = {
  SET_TODOS: 'SET_TODOS',
};

const TodosReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    default:
      return state;
  }
};

export default TodosReducer;

export const initialState = {
  todos: [],
};

export const actionTypes = {
  SET_TODOS: 'SET_TODOS',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
};

const TodosReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case actionTypes.ADD_TASK:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case actionTypes.DELETE_TASK:
      return {
        ...state,
        todos: state.todos.filter((task) => task.id !== action.payload.id),
      };

    case actionTypes.UPDATE_TASK:
      return {
        ...state,
        todos: state.todos.map((task) => {
          if (task.id === action.payload.id) {
            task = action.payload;
          }
          return task;
        }),
      };

    default:
      return state;
  }
};

export default TodosReducer;

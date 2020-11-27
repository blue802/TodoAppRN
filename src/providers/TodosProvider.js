import React, {createContext, useContext, useReducer} from 'react';

export const TodosContext = createContext();

export const TodosProvider = ({reducer, initialState, children}) => {
  return (
    <TodosContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosProvider = () => useContext(TodosContext);

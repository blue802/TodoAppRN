import React from 'react';

import AppNavigation from './src/navigations/AppNavigation';
import LoginScreen from './src/screens/Login/LoginScreen';
import {TodosProvider} from './src/providers/TodosProvider';
import {useUserProvider} from './src/providers/UserProvider';
import TodosReducer, {initialState} from './src/reducers/TodosReducer';

const AppContainer = () => {
  const [{user}, dispatch] = useUserProvider();

  return !user ? (
    <LoginScreen />
  ) : (
    <TodosProvider reducer={TodosReducer} initialState={initialState}>
      <AppNavigation />
    </TodosProvider>
  );
};

export default AppContainer;

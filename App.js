import React from 'react';
import {UserProvider} from './src/providers/UserProvider';
import UserReducer, {initialState} from './src/reducers/UserReducer';

import AppContainer from './AppContainer';

const App = () => {
  return (
    <UserProvider reducer={UserReducer} initialState={initialState}>
      <AppContainer />
    </UserProvider>
  );
};

export default App;

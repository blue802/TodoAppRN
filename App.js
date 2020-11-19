import React from 'react';
import {UserProvider} from './src/UserProvider';
import reducer, {initialState} from './src/reducer';

import AppContainer from './AppContainer';

const App = () => {
  return (
    <UserProvider reducer={reducer} initialState={initialState}>
      <AppContainer />
    </UserProvider>
  );
};

export default App;

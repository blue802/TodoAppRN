import React from 'react';

import AppNavigation from './src/navigations/AppNavigation';
import LoginScreen from './src/screens/Login/LoginScreen';
import {useUser} from './src/UserProvider';

const AppContainer = () => {
  const [{user}, dispatch] = useUser();

  return !user ? <LoginScreen /> : <AppNavigation />;
};

export default AppContainer;

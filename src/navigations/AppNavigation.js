import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native';

import HomeScreen from '../screens/Home/HomeScreen';
import CreateTaskScreen from '../screens/CreateTask/CreateTaskScreen';
import CategoryScreen from '../screens/Category/CategoryScreen';
import AchievementScreen from '../screens/Achievement/AchievementScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import styles from './styles';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          title: '',
          headerLeft: () => (
            <TouchableOpacity
              style={{padding: 16}}
              activeOpacity={0.5}
              onPress={() => navigation.openDrawer()}>
              <Icon name="grip-lines" color={'gray'} size={24} />
            </TouchableOpacity>
          ),
          headerStyle: styles.headerStyle,
        })}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Achievement"
        component={AchievementScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="Main"
      drawerContent={(props) => (
        <DrawerContainer navigation={props.navigation} />
      )}>
      <Drawer.Screen
        name="Main"
        component={MainNavigator}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

export default function AppContainer() {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {LogBox, StatusBar} from 'react-native';
import Ripple from 'react-native-material-ripple';

import HomeScreen from '../screens/Home/HomeScreen';
import CreateTaskScreen from '../screens/CreateTask/CreateTaskScreen';
import CategoryScreen from '../screens/Category/CategoryScreen';
import CategoryDetailsScreen from '../screens/CategoryDetails/CategoryDetailsScreen';
import AchievementScreen from '../screens/Achievement/AchievementScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import styles from './styles';
import Animated from 'react-native-reanimated';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainNavigator({style}) {
  return (
    <Animated.View
      style={{
        flex: 1,
        overflow: 'hidden',
        borderRadius: 16,
        ...style,
      }}>
      <StatusBar hidden={true} />
      <Stack.Navigator style={{backgroundColor: 'red'}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            title: '',
            headerLeft: () => (
              <Ripple
                rippleColor="violet"
                rippleOpacity={1}
                style={{padding: 16}}
                onPress={() => navigation.openDrawer()}>
                <Icon name="grip-lines" color={'gray'} size={24} />
              </Ripple>
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
          options={({navigation}) => ({
            title: '',
            headerLeft: () => (
              <Ripple
                rippleColor="violet"
                rippleOpacity={1}
                style={{padding: 16}}
                onPress={() => navigation.openDrawer()}>
                <Icon name="grip-lines" color={'gray'} size={24} />
              </Ripple>
            ),
            headerStyle: styles.headerStyle,
          })}
        />
        <Stack.Screen
          name="Achievement"
          component={AchievementScreen}
          options={({navigation}) => ({
            title: '',
            headerLeft: () => (
              <Ripple
                rippleColor="violet"
                rippleOpacity={1}
                style={{padding: 16}}
                onPress={() => navigation.openDrawer()}>
                <Icon name="grip-lines" color={'gray'} size={24} />
              </Ripple>
            ),
            headerStyle: styles.headerStyle,
          })}
        />
        <Stack.Screen
          name="CategoryDetails"
          component={CategoryDetailsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </Animated.View>
  );
}

function DrawerStack() {
  const [progress, setProgress] = useState(new Animated.Value(0));

  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const screensStyles = {transform: [{scale}]};

  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerType="slide"
      drawerStyle={{width: '70%'}}
      overlayColor="transparent"
      sceneContainerStyle={{backgroundColor: '#190A56'}}
      drawerContent={(props) => {
        setProgress(props.progress);
        return <DrawerContainer {...props} />;
      }}>
      <Drawer.Screen name="Main" options={{headerShown: false}}>
        {() => <MainNavigator style={screensStyles} />}
      </Drawer.Screen>
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

LogBox.ignoreLogs([
  'Cannot update a component from inside the function body of a different component',
]);

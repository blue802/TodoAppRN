import React, { useEffect, useState } from 'react';
import NetInfo from "@react-native-community/netinfo"
import {View, Text, TouchableOpacity, FlatList,Platform} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import {useUser} from '../../providers/UserProvider';
import useTodos from '../../hooks/useTodos';
// import {Update} from "../../components/firebase/Update"
import {
  getListTasks,
  addTask,
  toggleTask,
  removeTask,
  editTask,
} from '../../components/services/ServicesStorage';
import Task from '../../components/Task/Task';
import styles from './styles';

const HomeScreen = ({navigation}) => {
  console.log("home screen")
  const [{user}] = useUser();
  const [tasks,setTask] = useState([]);

  useEffect(()=>
  {
    getListTasks(user.uid)
    .then(tasks =>setTask(tasks))
    .catch(error =>console.error(error))
  },[]);

  const deleteById = (userId,taskId) => {
    removeTask(userId,taskId)
    .then((tasks) => setTask(tasks));
  };

  const edit = (userId,newTask)=>{
      editTask(userId,newTask)
      .then((tasks) => 
            {
              setTask(tasks);
              navigation.navigate("Home");
            });
  }

  const toggle = (userId,taskId) => {
      toggleTask(userId,taskId)
      .then((tasks) => 
            {
              setTask(tasks);
            });
  }

  const add = (title, createAt,category,userId)=>{
    addTask(title,createAt,category,userId)
    .then((tasks) => 
            {
              setTask(tasks);
              navigation.navigate("Home");
            });
  }
  //check connection and update data firebase
  NetInfo.fetch().then(state => {
    if(state.isConnected)
    {
      // Update(tasks,user.uid);
      console.log("update ")
    }
  });

  const renderItem = ({item}) => (
    <Task todo={item} navigation={navigation} deleteById={deleteById} edit = {edit} toggle={toggle}/>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.hiStyle}>What's up, {user.displayName}!</Text>
      <Text style={styles.sectionTitle}>TODAY'S TASKS</Text>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.taskId}
        />
      ) : (
        <Text style={styles.message}>Nothing!</Text>
      )}
      <TouchableOpacity
        style={styles.btnCreate}
        onPress={() => {
          navigation.navigate('CreateTask',{add});
        }}
        activeOpacity={0.8}>
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;

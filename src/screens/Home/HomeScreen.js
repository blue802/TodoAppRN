import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import * as Progress from 'react-native-progress';

import {useUserProvider} from '../../providers/UserProvider';
import {useTodosProvider} from '../../providers/TodosProvider';
import {actionTypes} from '../../reducers/TodosReducer';
import {
  getTodosFromLocalStorage,
  removeTaskFromLocalStorage,
} from '../../services/ServicesStorage';
import syncData from '../../container/syncData';

import Task from '../../components/Task/Task';
import styles from './styles';

const HomeScreen = ({navigation}) => {
  const [{user}] = useUserProvider();
  const [{todos}, dispatch] = useTodosProvider();

  useEffect(() => {
    syncData(user.uid);
  }, [user.uid]);

  useEffect(() => {
    getTodosFromLocalStorage(user.uid).then((results) => {
      dispatch({type: actionTypes.SET_TODOS, payload: results});
    });
  }, [dispatch, user.uid]);

  const deleteTask = (task) => {
    dispatch({type: actionTypes.DELETE_TASK, payload: task});
    removeTaskFromLocalStorage(task);
    syncData(user.uid);
  };

  const renderItem = ({item}) => (
    <Task todo={item} navigation={navigation} deleteTask={deleteTask} />
  );

  const calculateProgress = (todos) => {
    const len = todos.length;
    let count = 0;
    if (len !== 0) {
      for (let i = 0; i < len; i++) {
        if (todos[i].isCompleted) {
          count++;
        }
      }
      return count / len;
    }
    return 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hiStyle}>What's up, {user.displayName}!</Text>
      <View style={styles.progressWrap}>
        <Progress.Circle
          progress={calculateProgress(todos)}
          size={156}
          showsText={true}
          color="#3F2FFF"
          borderWidth={0}
          thickness={8}
          strokeCap="round"
        />
      </View>
      <Text style={styles.sectionTitle}>TODAY'S TASKS</Text>
      {todos.length > 0 ? (
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.message}>Nothing!</Text>
      )}
      <TouchableOpacity
        style={styles.btnCreate}
        onPress={() => {
          navigation.navigate('CreateTask');
        }}
        activeOpacity={0.8}>
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;

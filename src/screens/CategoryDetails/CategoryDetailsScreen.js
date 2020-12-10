import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Task from '../../components/Task/Task';
import styles from './styles';
import {useUserProvider} from '../../providers/UserProvider';
import {useTodosProvider} from '../../providers/TodosProvider';
import useCategory from '../../hooks/useCategory';
import {removeTaskFromLocalStorage} from '../../services/ServicesStorage';
import {actionTypes} from '../../reducers/TodosReducer';
import syncData from '../../container/syncData';

const CategoryDetailsScreen = ({route, navigation}) => {
  const {tasks} = useCategory(route.params.category);
  const [{user}] = useUserProvider();
  const [state, dispatch] = useTodosProvider();

  const deleteTask = (task) => {
    dispatch({type: actionTypes.DELETE_TASK, payload: task});
    removeTaskFromLocalStorage(task);
    syncData(user.uid);
  };
  const renderItem = ({item}) => (
    <Task todo={item} navigation={navigation} deleteTask={deleteTask} />
  );

  const toPrevious = () => {
    navigation.navigate('Category');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnClose} onPress={toPrevious}>
          <Icon name="times" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>
          {route.params.category.toUpperCase()}
        </Text>
        {tasks.length > 0 ? (
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.message}>Nothing!</Text>
        )}
      </View>
    </View>
  );
};

export default CategoryDetailsScreen;

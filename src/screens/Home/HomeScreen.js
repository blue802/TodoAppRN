import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {useUser} from '../../providers/UserProvider';
import useTodos from '../../hooks/useTodos';
import styles from './styles';
import Task from '../../components/Task/Task';

const HomeScreen = ({navigation}) => {
  const [{user}] = useUser();
  const {todos} = useTodos('todos');

  const deleteById = (id) => {
    firestore()
      .collection('todos')
      .doc(id)
      .delete()
      .then(() => {
        console.log('The task was deleted.');
      });
  };

  const renderItem = ({item}) => (
    <Task todo={item} navigation={navigation} deleteById={deleteById} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.hiStyle}>What's up, {user.displayName}!</Text>
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

import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Task from '../../components/Task/Task';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CategoryDetailsScreen = ({route, navigation}) => {
  const {todos, category} = route.params;

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
        <Text style={styles.sectionTitle}>{category.toUpperCase()}</Text>
        {todos.length > 0 ? (
          <FlatList
            data={todos}
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

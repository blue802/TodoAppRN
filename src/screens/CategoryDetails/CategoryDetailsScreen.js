import React,{useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Task from '../../components/Task/Task';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {editTask,toggleTask,removeTask} from '../../components/services/ServicesStorage'
import {useUser} from '../../providers/UserProvider';

const CategoryDetailsScreen = ({route, navigation}) => {
  const {todos, category} = route.params;
  const [{user}] = useUser();
  const [tasks,setTask] = useState(todos);

  const deleteById = (userId,taskId) => {
    removeTask(userId,taskId)
    .then((tasks) =>{
      tasks = tasks.filter(t => t.category === category);
      setTask(tasks)
    });
  };

  const edit = (userId,newTask)=>{
      editTask(userId,newTask)
      .then((tasks) => 
            {
              tasks = tasks.filter(t => t.category === category);
              setTask(tasks);
              navigation.navigate("CategoryDetails");
            });
  }

  const toggle = (userId,taskId) => {
      toggleTask(userId,taskId)
      .then((tasks) => 
            {
              tasks = tasks.filter(t => t.category === category);
              setTask(tasks);
            });
  }

  const renderItem = ({item}) => (
    <Task todo={item} navigation={navigation} deleteById={deleteById} edit = {edit} toggle={toggle}/>
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

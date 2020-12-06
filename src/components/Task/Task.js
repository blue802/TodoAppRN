import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firestore, {firebase} from '@react-native-firebase/firestore';

import styles from './styles';

const Task = ({navigation, todo, deleteById}) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const closeRowRef = useRef(null);
  const deleteTimeoutRef = useRef(null);

  const handleCompleteTask = () => {
    setIsCompleted(!isCompleted);
    firestore()
      .collection('todos')
      .doc(todo.id)
      .update({isCompleted: !isCompleted})
      .then(() => {
        console.log('The task has been completed!');
        navigation.navigate('Home');
      });
  };

  const onSwipeValueChange = ({value}) => {
    if (value === -Dimensions.get('window').width + 32) {
      deleteTimeoutRef.current = setTimeout(() => {
        deleteById(todo.id);
      }, 1500);
    }
  };

  const undoItem = () => {
    clearTimeout(deleteTimeoutRef.current);
    closeRowRef.current.closeRow();
  };

  return (
    <SwipeRow
      ref={closeRowRef}
      style={styles.container}
      disableRightSwipe={true}
      rightOpenValue={-Dimensions.get('window').width + 32}
      onSwipeValueChange={onSwipeValueChange}>
      <View style={styles.rowBack}>
        <Icon name="trash" style={styles.iconTrash} />
        <Text style={styles.message}>The task was deleted</Text>
        <TouchableOpacity style={styles.btnUndo} onPress={() => undoItem()}>
          <Text style={{color: 'gray', fontSize: 12}}>UNDO</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('CreateTask', {todo})}>
        <View style={styles.rowFront}>
          {isCompleted ? (
            <Icon
              name="check-circle"
              onPress={handleCompleteTask}
              style={{...styles.icon, opacity: isCompleted ? 0.5 : 1}}
              solid={true}
            />
          ) : (
            <Icon
              name="circle"
              onPress={handleCompleteTask}
              style={{...styles.icon, opacity: isCompleted ? 0.5 : 1}}
            />
          )}
          <Text
            style={{
              ...styles.title,
              textDecorationLine: isCompleted ? 'line-through' : 'none',
              opacity: isCompleted ? 0.5 : 1,
            }}>
            {todo.title}
          </Text>
        </View>
      </TouchableOpacity>
    </SwipeRow>
  );
};

export default Task;

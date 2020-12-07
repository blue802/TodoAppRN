import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useUser} from "../../providers/UserProvider"

import styles from './styles';

const Task = ({navigation, todo, deleteById,edit,toggle}) => {
  const [{user}] = useUser();
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const closeRowRef = useRef(null);
  const deleteTimeoutRef = useRef(null);

  const handleCompleteTask = () => {
    setIsCompleted(!isCompleted);
  };

  const onSwipeValueChange = ({value}) => {
    if (value === -Dimensions.get('window').width + 32) {
      deleteTimeoutRef.current = setTimeout(() => {
        deleteById(user.uid,todo.taskId);
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
        onPress={() => navigation.navigate('CreateTask', {todo,edit})}>
        <View style={styles.rowFront}>
          {todo.isCompleted ? (
            <Icon
              name="check-circle"
              onPress={()=>toggle(user.uid,todo.taskId)}
              style={{...styles.icon, opacity: todo.isCompleted ? 0.5 : 1}}
              solid={true}
            />
          ) : (
            <Icon
              name="circle"
              onPress={()=>toggle(user.uid,todo.taskId)}
              style={{...styles.icon, opacity: todo.isCompleted ? 0.5 : 1}}
            />
          )}
          <Text
            style={{
              ...styles.title,
              textDecorationLine: todo.isCompleted ? 'line-through' : 'none',
              opacity: todo.isCompleted ? 0.5 : 1,
            }}>
            {todo.title}
          </Text>
        </View>
      </TouchableOpacity>
    </SwipeRow>
  );
};

export default Task;

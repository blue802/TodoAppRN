import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome5';

import syncData from '../../container/syncData';
import {
  updateTaskFromLocalStorage,
  getTodosFromLocalStorage,
} from '../../services/ServicesStorage';
import {useTodosProvider} from '../../providers/TodosProvider';
import {useUserProvider} from '../../providers/UserProvider';
import {actionTypes} from '../../reducers/TodosReducer';
import styles from './styles';

const Task = ({navigation, todo, deleteTask}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const closeRowRef = useRef(null);
  const deleteTimeoutRef = useRef(null);
  const [state, dispatch] = useTodosProvider();
  const [{user}] = useUserProvider();

  useEffect(() => {
    setIsCompleted(todo.isCompleted);
  }, [todo.isCompleted]);

  const handleCompleteTask = () => {
    setIsCompleted(true);
    const task = {
      id: todo.id,
      title: todo.title,
      category: todo.category,
      isCompleted: true,
      createAt: todo.createAt,
      userId: todo.userId,
    };
    dispatch({type: actionTypes.UPDATE_TASK, payload: task});
    updateTaskFromLocalStorage(task);
    syncData(user.uid);
  };

  const onSwipeValueChange = ({value}) => {
    if (value === -Dimensions.get('window').width + 32) {
      deleteTimeoutRef.current = setTimeout(() => {
        deleteTask(todo);
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
        onPress={() =>
          !todo.isCompleted && navigation.navigate('CreateTask', {todo})
        }>
        <View style={styles.rowFront}>
          {isCompleted ? (
            <Icon
              name="check-circle"
              style={{...styles.icon, opacity: isCompleted ? 0.5 : 1}}
              onPress={handleCompleteTask}
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

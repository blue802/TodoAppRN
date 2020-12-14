import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ripple from 'react-native-material-ripple';

import syncData from '../../container/syncData';
import syncAchievement from '../../container/syncAchievement';
import {updateTaskFromLocalStorage} from '../../services/ServicesStorage';
import {updateScoreFromLocalStorage} from '../../services/UserStorage';
import {useTodosProvider} from '../../providers/TodosProvider';
import {useUserProvider} from '../../providers/UserProvider';
import {actionTypes} from '../../reducers/TodosReducer';
import styles from './styles';
import {color} from 'react-native-reanimated';

const Task = ({navigation, todo, deleteTask}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const closeRowRef = useRef(null);
  const deleteTimeoutRef = useRef(null);
  const [state, dispatchTodos] = useTodosProvider();
  const [{user}, dispatchUser] = useUserProvider();

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
    dispatchTodos({type: actionTypes.UPDATE_TASK, payload: task});
    updateTaskFromLocalStorage(task);
    dispatchUser({type: 'INCREASE_USER_SCORE'});
    updateScoreFromLocalStorage(user.uid, user.score + 1);
    syncData(user.uid);
    syncAchievement(user.uid);
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

  const getColor = (category) => {
    if (category === 'business') {
      return '#00f5d4';
    }

    if (category === 'family') {
      return '#9b5de5';
    }

    if (category === 'personal') {
      return '#00bbf9';
    }
    return color;
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
        <Ripple
          style={styles.btnUndo}
          rippleColor="violet"
          rippleCentered={true}
          onPress={() => undoItem()}>
          <Text style={{color: 'gray', fontSize: 12}}>UNDO</Text>
        </Ripple>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          !todo.isCompleted && navigation.navigate('CreateTask', {todo})
        }>
        <View style={styles.rowFront}>
          {todo.isCompleted ? (
            <Icon
              name="check-circle"
              style={{...styles.icon, opacity: 0.5}}
              solid={true}
              color={getColor(todo.category)}
            />
          ) : (
            <Icon
              name="circle"
              onPress={handleCompleteTask}
              style={{...styles.icon, opacity: 1}}
              color={getColor(todo.category)}
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

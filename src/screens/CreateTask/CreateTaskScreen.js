import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Platform, LogBox} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import shortid from 'shortid';
import Ripple from 'react-native-material-ripple';

import syncData from '../../container/syncData';
import {useUserProvider} from '../../providers/UserProvider';
import {useTodosProvider} from '../../providers/TodosProvider';
import {actionTypes} from '../../reducers/TodosReducer';
import {
  addNewTaskToLocalStorage,
  updateTaskFromLocalStorage,
} from '../../services/ServicesStorage';
import styles from './styles';

const CreateTaskScreen = ({navigation, route}) => {
  const [{user}] = useUserProvider();
  const [{todos}, dispatch] = useTodosProvider();
  var [date, setDate] = useState(new Date());
  var [mode, setMode] = useState('date');
  var [showModal, setShowModal] = useState(false);
  var [taskName, setTaskName] = useState('');
  var [category, setCategory] = useState(null);

  useEffect(() => {
    if (route.params) {
      const {todo} = route.params;
      setTaskName(todo.title);
      setDate(todo.createAt);
      setCategory(todo.category);
    }
  }, [route.params]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowModal(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const toPrevious = () => {
    navigation.goBack();
  };

  const showMode = (currentMode) => {
    setShowModal(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const createTask = () => {
    const task = {
      id: shortid.generate(),
      title: taskName,
      createAt: date,
      category,
      isCompleted: false,
      userId: user.uid,
    };

    dispatch({type: actionTypes.ADD_TASK, payload: task});
    addNewTaskToLocalStorage(task).then((msg) => {
      console.log(msg);
      syncData(user.uid);
      navigation.goBack();
    });
  };

  const updateTask = () => {
    const {todo} = route.params;
    const task = {
      id: todo.id,
      title: taskName,
      category,
      isCompleted: todo.isCompleted,
      createAt: date,
      userId: todo.userId,
    };
    dispatch({type: actionTypes.UPDATE_TASK, payload: task});
    updateTaskFromLocalStorage(task).then((msg) => {
      console.log(msg);
      navigation.goBack();
    });
    syncData(user.uid);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ripple
          rippleColor="violet"
          rippleCentered={true}
          style={styles.btnClose}
          onPress={toPrevious}>
          <Icon name="times" style={styles.icon} />
        </Ripple>
      </View>
      <View style={styles.body}>
        <View style={styles.inputWrap}>
          <TextInput
            type="text"
            style={styles.input}
            placeholder={route.params ? 'Edit task' : 'Create a new task..'}
            value={taskName}
            onChangeText={(text) => {
              setTaskName(text);
            }}
          />
        </View>
        <View style={styles.btnWrap}>
          <Ripple
            rippleColor="violet"
            rippleCentered={true}
            rippleOpacity={1}
            onPress={showDatepicker}
            style={styles.btn}>
            <Icon name="calendar-alt" style={styles.icon} />
            <Text style={styles.text}>
              {date.getDate() +
                '-' +
                (date.getMonth() + 1) +
                '-' +
                date.getFullYear()}
            </Text>
          </Ripple>
          <Ripple
            rippleColor="violet"
            rippleCentered={true}
            rippleOpacity={1}
            onPress={showTimepicker}
            style={styles.btn}>
            <Icon name="clock" style={styles.icon} />
            <Text style={styles.text}>
              {date.getHours() +
                ':' +
                (date.getMinutes() < 10 ? '0' : '') +
                date.getMinutes()}
            </Text>
          </Ripple>
        </View>

        <View style={styles.pickerWrap}>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}>
            <Picker.Item label="Business" value="business" />
            <Picker.Item label="Personal" value="personal" />
            <Picker.Item label="Family" value="family" />
          </Picker>
        </View>
      </View>
      <View style={styles.footer}>
        {route.params ? (
          <Ripple
            rippleColor="violet"
            rippleOpacity={1}
            style={styles.btnCreate}
            onPress={() => taskName && updateTask()}>
            <Text style={{fontSize: 18, color: '#fff'}}>Save</Text>
          </Ripple>
        ) : (
          <Ripple
            rippleColor="violet"
            rippleOpacity={1}
            style={styles.btnCreate}
            onPress={() => taskName && createTask()}>
            <Text style={{fontSize: 18, color: '#fff'}}>New task</Text>
          </Ripple>
        )}
      </View>
      {showModal && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default CreateTaskScreen;

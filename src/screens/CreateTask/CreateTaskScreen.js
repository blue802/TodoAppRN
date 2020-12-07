import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
import firestore, {firebase} from '@react-native-firebase/firestore';

import {useUser} from '../../providers/UserProvider';
import styles from './styles';

const CreateTaskScreen = ({navigation, route}) => {
  const [{user}] = useUser();
  var [date, setDate] = useState(new Date());
  var [mode, setMode] = useState('date');
  var [showModal, setShowModal] = useState(false);
  var [taskName, setTaskName] = useState('');
  var [category, setCategory] = useState("personal");
  const {add,edit,todo} = route.params;
  useEffect(() => {
    if (route.params.todo) {
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
    navigation.navigate('Home');
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnClose} onPress={toPrevious}>
          <Icon name="times" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.inputWrap}>
          <TextInput
            type="text"
            style={styles.input}
            placeholder={route.params.todo ? 'Edit task' : 'Create a new task..'}
            value={taskName}
            onChangeText={(text) => {
              setTaskName(text);
            }}
          />
        </View>
        <View style={styles.btnWrap}>
          <TouchableOpacity onPress={showDatepicker} style={styles.btn}>
            <Icon name="calendar-alt" style={styles.icon} />
            <Text style={styles.text}>
              {date.getDate() +
                '-' +
                (date.getMonth() + 1) +
                '-' +
                date.getFullYear()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showTimepicker} style={styles.btn}>
            <Icon name="clock" style={styles.icon} />
            <Text style={styles.text}>
              {date.getHours() + ':' + date.getMinutes()}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pickerWrap}>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}>
            <Picker.Item label="Default" value="default" />
            <Picker.Item label="Business" value="business" />
            <Picker.Item label="Personal" value="personal" />
            <Picker.Item label="Family" value="family" />
          </Picker>
        </View>
      </View>
      <View style={styles.footer}>
        {route.params.todo ? (
          <TouchableOpacity style={styles.btnCreate} 
                            onPress={()=>
                            {
                              const newTask={title:taskName,date,category,taskId:todo.taskId}
                              edit(user.uid,newTask);
                            }}>
            <Text style={{fontSize: 18, color: '#fff'}}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btnCreate} onPress={()=>add(taskName,date,category,user.uid)}>
            <Text style={{fontSize: 18, color: '#fff'}}>New task</Text>
          </TouchableOpacity>
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

export default CreateTaskScreen;
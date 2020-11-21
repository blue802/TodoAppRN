import React, {useState} from 'react';
import {View, Text,TextInput,Button,TouchableOpacity,Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from "@react-native-picker/picker"; 

import styles from './styles'

const CreateTaskScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [nameTask, setNameTask] = useState("");
  const [category, setCategory] = useState("Default");

  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const createTask = ()=>
  {
    Alert.alert(nameTask)
    console.log(category)
    Alert.alert(date.toLocaleDateString())
    Alert.alert(date.toLocaleTimeString())
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title:"Thêm mới",
      headerRight: () => (
        <TouchableOpacity onPress={createTask} >
          <Icon name="check" color={'#25a9e8'} size={32} style={{marginRight:10}}/>
        </TouchableOpacity>
      )
    });
  }, [navigation]);
  return (
    <View style = {styles.container}>
      <View style = {styles.block}>
        <Text style = {styles.text}>Nhiệm vụ:</Text>
        <TextInput type="text" 
                  style = {styles.input} 
                  placeholder="Nhập nhiệm vụ ở đây" 
                  value={nameTask}
                  onChangeText={async(text)=>{
                    await setNameTask(text)}}/>
      </View>
      <View style = {styles.block}>
        <Text style = {styles.text}>Ngày hết hạn:</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <TextInput type="text" style = {styles.input} 
                        placeholder="Chọn ngày hết hạn" 
                        name="date" 
                        value={date.toLocaleDateString()}
                        onChangeText={showDatepicker}
                        readonly/>
          <Icon name="calendar-alt" color={'#25a9e8'} size={24} style={styles.calendar}/>
        </TouchableOpacity>
      </View >
      <View style = {styles.block}>
        <Text style = {styles.text}>Vào lúc:</Text>
        <TouchableOpacity onPress={showTimepicker}>
          <TextInput type="text" style = {styles.input} 
                        placeholder="Chọn giờ" 
                        name="time" 
                        value={date.toLocaleTimeString()}
                        onChangeText={showTimepicker}
                        readonly/>
          <Icon name="clock" color={'#25a9e8'} size={24} style={styles.calendar}/>
        </TouchableOpacity>
      </View>

      <View style = {styles.block}>
        <Text style = {styles.text}>Thêm vào danh sách:</Text>
        <Picker selectedValue={category}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            >
            <Picker.Item label="Mặc định" value="Mặc định" />
            <Picker.Item label="Công việc" value="Công việc" />
        </Picker>
      </View>
      {show && (
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

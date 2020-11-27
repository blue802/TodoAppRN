import React,{useState,useEffect} from 'react';
import {View, Text,TouchableOpacity,Image,FlatList} from 'react-native';

import {getListTasks,addTask,removeTask,editTask} from "../../components/services/ServicesStorage";

import {useUser} from '../../UserProvider';
import styles from './styles';
import Add from "./images/plus.png";
import Task from "./Task";

const HomeScreen = (props) => {
  const [{user}, dispath] = useUser();
  const {navigation} = props;
  const {email} = user;

  const [listTasks,setListTasks] = useState([]);
  useEffect(()=>
  {
    getListTasks(email)
    .then(tasks => 
    {
      if(tasks.e) return;
      setListTasks(tasks);
    })
    .catch(error => 
    {
      console.error(error)
    })
  },[])

  const createTask = (email,nameTask,date_complete,category) =>
  {
    addTask(email,nameTask,date_complete,category)
            .then(tasks => {
                setListTasks(tasks);
            })
    navigation.navigate("Home");
  }

  const deleteTask = (email,task) => 
  {
    removeTask(email,task)
    .then((tasks) => 
    {
      setListTasks(tasks);
    })
  }

  const edit = (email,id,newName,newCategory,newDate) => 
  {
    editTask(email,id,newName,newCategory,newDate)
    .then((tasks) => 
    {
      setListTasks(tasks);
    })
    navigation.navigate("Home");
  }

  return ( 
    <View style={styles.container}>
            <Text>Home</Text>
            <Text>Hello {user.displayName}</Text>
            <FlatList data={listTasks}
                      renderItem={({item}) =><Task task={item} 
                                                    navigation={navigation} 
                                                    removeTask={deleteTask}
                                                    editTask={edit}/>}
                      keyExtractor = {item =>`${item.id}`}
            />
            <TouchableOpacity style={styles.addButton} onPress={()=>{navigation.navigate("CreateTask",{createTask})}}>
                <Image source={Add} style={{width:56,height:56}}/>
            </TouchableOpacity>
    </View>
    );
};
export default HomeScreen;

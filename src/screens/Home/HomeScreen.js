import React,{useState} from 'react';
import {View, Text,TouchableOpacity,Image,FlatList} from 'react-native';

import {useUser} from '../../UserProvider';
import styles from './styles';
import Add from "./images/plus.png";
import Task from "./Task";

const HomeScreen = (props) => {
  const data = [
    {
      id:1234,
      name:"Hoàn thành đồ án",
      date:"28/11/2020",
      time:"20:28:22",
      category:"Công việc",
      status:false
    },
    {
      id:1235,
      name:"Hoàn thành bài tập",
      date:"30/11/2020",
      time:"19:28:22",
      category:"Công việc",
      status:false
    },
    {
      id:1236,
      name:"Hoàn thành bài tập react native",
      date:"19/11/2020",
      time:"19:28:22",
      category:"Công việc",
      status:false
    }
  ];
  const [tasks, setTasks] = useState(data);
  const [{user}, dispath] = useUser();
  const {navigation} = props;
  return ( 
    <View style={styles.container}>
            <Text>Home</Text>
            <Text>Hello {user.displayName}</Text>
            <FlatList data={tasks}
                      renderItem={({item}) =><Task task={item} navigation={navigation}/>}
                      keyExtractor = {item =>`${item.id}`}
            />
            <TouchableOpacity style={styles.addButton} onPress={()=>{navigation.navigate("CreateTask")}}>
                <Image source={Add} style={{width:56,height:56}}/>
            </TouchableOpacity>
    </View>
    );
};
export default HomeScreen;

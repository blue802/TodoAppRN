import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import * as Progress from 'react-native-progress';

import {useUser} from '../../providers/UserProvider';
import useTodos from '../../hooks/useTodos';
// import {
//   getListTasks,
//   addTask,
//   removeTask,
//   editTask,
// } from '../../components/services/ServicesStorage';
import Task from '../../components/Task/Task';
import styles from './styles';

const HomeScreen = ({navigation}) => {
  const [{user}] = useUser();
  const {todos, total, done} = useTodos('todos');

  const deleteById = (id) => {
    firestore()
      .collection('todos')
      .doc(id)
      .delete()
      .then(() => {
        console.log('The task was deleted.');
      });
  };

  const renderItem = ({item}) => (
    <Task todo={item} navigation={navigation} deleteById={deleteById} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.hiStyle}>What's up, {user.displayName}!</Text>
      <View style={{alignItems: 'center', marginVertical: 16}}>
        <Progress.Circle
          progress={total === 0 ? 0 : done / total}
          size={156}
          showsText={true}
          color="#3F2FFF"
          borderWidth={0}
          thickness={8}
          strokeCap="round"
        />
      </View>
      <Text style={styles.sectionTitle}>TODAY'S TASKS</Text>
      {todos.length > 0 ? (
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.message}>Nothing!</Text>
      )}
      <TouchableOpacity
        style={styles.btnCreate}
        onPress={() => {
          navigation.navigate('CreateTask');
        }}
        activeOpacity={0.8}>
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;

//   const [listTasks,setListTasks] = useState([]);
//   useEffect(()=>
//   {
//     getListTasks(email)
//     .then(tasks =>
//     {
//       if(tasks.e) return;
//       setListTasks(tasks);
//     })
//     .catch(error =>
//     {
//       console.error(error)
//     })
//   },[])

//   const createTask = (email,nameTask,date_complete,category) =>
//   {
//     addTask(email,nameTask,date_complete,category)
//             .then(tasks => {
//                 setListTasks(tasks);
//             })
//     navigation.navigate("Home");
//   }

//   const deleteTask = (email,task) =>
//   {
//     removeTask(email,task)
//     .then((tasks) =>
//     {
//       setListTasks(tasks);
//     })
//   }

//   const edit = (email,id,newName,newCategory,newDate) =>
//   {
//     editTask(email,id,newName,newCategory,newDate)
//     .then((tasks) =>
//     {
//       setListTasks(tasks);
//     })
//     navigation.navigate("Home");
//   }

//   return (
//     <View style={styles.container}>
//             <Text>Home</Text>
//             <Text>Hello {user.displayName}</Text>
//             <FlatList data={listTasks}
//                       renderItem={({item}) =><Task task={item}
//                                                     navigation={navigation}
//                                                     removeTask={deleteTask}
//                                                     editTask={edit}/>}
//                       keyExtractor = {item =>`${item.id}`}
//             />
//             <TouchableOpacity style={styles.addButton} onPress={()=>{navigation.navigate("CreateTask",{createTask})}}>
//                 <Image source={Add} style={{width:56,height:56}}/>
//             </TouchableOpacity>
//     </View>
//   );

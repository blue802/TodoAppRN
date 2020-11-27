import React,{useState} from 'react';
import {View, Text,TouchableOpacity,Image,StyleSheet,ToastAndroid,Alert} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useUser} from '../../UserProvider';
const Task = ({navigation,task,removeTask,editTask}) => 
{
    const [{user:{email}}, dispath] = useUser();
    let onPress = () =>
    {
        navigation.navigate("EditTask",{task,editTask});
    }

    
    const {name,date_complete,category} = task;

    return (
        <Swiper style={styles.container} showsPagination={false} >
            <TouchableOpacity style={styles.task} activeOpacity={0.7} onPress={onPress} >
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.category}>{category}</Text>
                <Text style={styles.date}>
                    {(date_complete.getDate())+"/"+(date_complete.getMonth()+1)+"/"+(date_complete.getFullYear())}
                </Text>
                {/* <Text>{task.time}</Text> */}
                <TouchableOpacity style={styles.trash} onPress={()=>removeTask(email,task)}>
                    <Icon name="trash" color={'#25a9e8'} size={24} />
                </TouchableOpacity>
            </TouchableOpacity >
            <View style={styles.task}>
                <Icon name="calendar-alt" color={'#25a9e8'} />
                <Icon name="calendar-alt" color={'#25a9e8'}/>
            </View>
        </Swiper>
    )
}

const styles = StyleSheet.create({
    container: 
    {
        height:85
    },
    task: 
    {
        marginVertical:4,
        marginHorizontal:14,
        backgroundColor: "#fff",
        borderRadius:8,
        padding:8,
        elevation:2
    },
    name: 
    {
        fontSize:16,
        fontWeight:"bold",
    },
    trash:
    {
        position:"absolute",
        top:"40%",
        right:6,
    }
});
export default Task;
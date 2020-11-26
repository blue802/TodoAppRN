import React,{useState} from 'react';
import {View, Text,TouchableOpacity,Image,StyleSheet,ToastAndroid,Alert} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Task = ({navigation,task}) => 
{
    let onPress = () =>
    {
        // chuyển sang trang chi tiết và edit
        navigation.navigate("EditTask",{task:task});
    }

    var deleteTask = (id) =>
    {
        Alert.alert("xóa"+id)
    }

    return (
        <Swiper style={styles.container} showsPagination={false} >
            <TouchableOpacity style={styles.task} activeOpacity={0.7} onPress={onPress} >
                <Text style={styles.name}>{task.name}</Text>
                <Text style={styles.category}>{task.category}</Text>
                <Text style={styles.date}>{task.date}</Text>
                {/* <Text>{task.time}</Text> */}
                <TouchableOpacity style={styles.trash} onPress={()=>deleteTask(task.id)}>
                    <Icon name="trash" color={'#25a9e8'} size={28} />
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
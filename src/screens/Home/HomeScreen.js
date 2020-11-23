import React from 'react';
import {View, Text,TouchableOpacity,Image} from 'react-native';

import {useUser} from '../../UserProvider';
import styles from './styles';
import Add from "./images/plus.png";

const HomeScreen = (props) => {
  const [{user}, dispath] = useUser();
  const {navigation} = props;
  return ( 
    <View style={styles.container}>
            <Text>Home</Text>
            <Text>Hello {user.displayName}</Text>
            <TouchableOpacity style={styles.addButton} onPress={()=>{navigation.navigate("CreateTask",
                                                                              {navigation:props.navigation})}}>
                <Image source={Add} style={{width:56,height:56}}/>
            </TouchableOpacity>
    </View>
    );
};

export default HomeScreen;

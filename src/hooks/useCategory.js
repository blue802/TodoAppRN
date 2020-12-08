import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import firestore from '@react-native-firebase/firestore';
import {getTaskByCategory} from "../components/services/ServicesStorage"

import {useUser} from '../providers/UserProvider';
const useCategory = (category) => {
  const [{user}] = useUser();
  const [todos, setTodos] = useState([]);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);

  // useEffect(() => {
  //   const unsub = firestore()
  //     .collection('todos')
  //     .orderBy('createAt', 'desc')
  //     .onSnapshot((snap) => {
  //       let docs = [];
  //       let count = 0;
  //       let sum = 0;
  //       snap.forEach((doc) => {
  //         if (
  //           doc.data().userId === user.uid &&
  //           doc.data().category === category
  //         ) {
  //           docs.push({id: doc.id, ...doc.data()});
  //           sum++;
  //           if (doc.data().isCompleted) {
  //             count++;
  //           }
  //         }
  //       });
  //       setTodos(docs);
  //       setTotal(sum);
  //       setDone(count);
  //     });
  //   return () => unsub();
  // }, [category, total, user.uid]);

  useEffect(() => {
    getTaskByCategory(user.uid,category)
    .then((tasks) => {
      setTodos(tasks);
      let sum=0;
      let count=0;
      for(let task of tasks) 
      {
        sum ++;
        if(task.isCompleted) count++;
      }
      setDone(count);
      setTotal(sum);
    })
  },[done,total]);
  return {todos, total, done};
};

export default useCategory;

useCategory.prototype = {
  category: PropTypes.string.isRequired,
};
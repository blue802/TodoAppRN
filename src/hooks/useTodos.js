import {useEffect, useState} from 'react';

import firestore from '@react-native-firebase/firestore';

const useTodos = ({collection}) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsub = firestore()
      .collection('todos')
      .orderBy('createAt', 'desc')
      .onSnapshot((snap) => {
        let docs = [];
        snap.forEach((doc) => docs.push({id: doc.id, ...doc.data()}));
        setTodos(docs);
      });

    return () => unsub();
  }, [collection]);

  return {todos};
};

export default useTodos;

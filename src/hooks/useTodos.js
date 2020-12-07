import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import firestore from '@react-native-firebase/firestore';

import {useUser} from '../providers/UserProvider';
const useTodos = (collection) => {
  const [{user}] = useUser();
  const [todos, setTodos] = useState([]);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);

  useEffect(() => {
    const unsub = firestore()
      .collection(collection)
      .orderBy('createAt', 'desc')
      .onSnapshot((snap) => {
        let docs = [];
        let sum = 0;
        let count = 0;
        snap.forEach((doc) => {
          if (doc.data().userId === user.uid) {
            docs.push({id: doc.id, ...doc.data()});
            sum++;
            if (doc.data().isCompleted) {
              count++;
            }
          }
        });
        setTodos(docs);
        setTotal(sum);
        setDone(count);
      });

    return () => unsub();
  }, [collection, user.uid]);

  return {todos, total, done};
};

export default useTodos;

useTodos.prototype = {
  collection: PropTypes.string.isRequired,
};

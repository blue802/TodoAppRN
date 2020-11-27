import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import firestore from '@react-native-firebase/firestore';

import {useUser} from '../providers/UserProvider';
const useTodos = (collection) => {
  const [{user}] = useUser();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsub = firestore()
      .collection(collection)
      .orderBy('createAt', 'desc')
      .onSnapshot((snap) => {
        let docs = [];
        snap.forEach((doc) => {
          if (doc.data().userId === user.uid) {
            docs.push({id: doc.id, ...doc.data()});
          }
        });
        setTodos(docs);
      });

    return () => unsub();
  }, [collection, user.uid]);

  return {todos};
};

export default useTodos;

useTodos.prototype = {
  collection: PropTypes.string.isRequired,
};

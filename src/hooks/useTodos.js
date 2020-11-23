import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import firestore from '@react-native-firebase/firestore';

const useTodos = ({collection}) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsub = firestore()
      .collection(collection)
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

useTodos.prototype = {
  collection: PropTypes.string.isRequired,
};

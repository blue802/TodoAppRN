import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {useUserProvider} from '../providers/UserProvider';
import {useTodosProvider} from '../providers/TodosProvider';
import {actionTypes} from '../reducers/TodosReducer';
import {getTodosFromLocalStorage} from '../services/ServicesStorage';
const useTodos = () => {
  const [{user}] = useUserProvider();
  const [{todos}, dispatch] = useTodosProvider();
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);

  useEffect(() => {
    getTodosFromLocalStorage(user.uid).then((todos) => {
      let count = 0;
      todos.forEach((task) => {
        if (task.isCompleted) {
          count++;
        }
      });
      setTotal(todos.length);
      setDone(count);
      dispatch({type: actionTypes.SET_TODOS, payload: todos});
    });
  }, [dispatch, user.uid]);

  return {todos, total, done};
};

export default useTodos;
useTodos.prototype = {
  collection: PropTypes.string.isRequired,
};

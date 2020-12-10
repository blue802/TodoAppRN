import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {getTodosFromLocalStorage} from '../services/ServicesStorage';
import {useTodosProvider} from '../providers/TodosProvider';
import {useUserProvider} from '../providers/UserProvider';
const useCategory = (category) => {
  const [{user}] = useUserProvider();
  const [{todos}] = useTodosProvider();
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);

  useEffect(() => {
    let count = 0;
    let docs = [];
    todos.forEach((task) => {
      if (task.category === category) {
        docs.push(task);
        if (task.isCompleted) {
          count++;
        }
      }
    });
    setTasks(docs);
    setTotal(docs.length);
    setDone(count);
  }, [category, todos, user.uid]);

  return {tasks, total, done};
};

export default useCategory;

useCategory.prototype = {
  category: PropTypes.string.isRequired,
};

import realm from './realm';

export const getTodosFromLocalStorage = (userId, category = null) => {
  const todos = category
    ? realm
        .objects('Task')
        .filter((task) => task.userId === userId && task.category === category)
    : realm.objects('Task').filter((task) => task.userId === userId);
  return Promise.resolve(todos);
};

export const addNewTaskToLocalStorage = (newTask) => {
  return new Promise((resolve, reject) => {
    realm.write(() => {
      realm.create('Task', newTask, true);
      resolve('Create a new task successfully!');
    });
  });
};

export const removeTaskFromLocalStorage = (task) => {
  let selected = realm.objectForPrimaryKey('Task', task.id);
  return new Promise((resolve) => {
    realm.write(() => {
      realm.delete(selected);
      resolve('Deleted!');
    });
  });
};

export const completeTaskFromLocalStorage = (task) => {
  return new Promise((resolve) => {
    realm.write(() => {
      realm.create('Task', task, 'modified');
      resolve('Completed!');
    });
  });
};

export const updateTaskFromLocalStorage = (newTask) => {
  return new Promise((resolve) => {
    realm.write(() => {
      realm.create('Task', newTask, 'modified');
      resolve('Update successfully!');
    });
  });
};

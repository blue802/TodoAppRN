import realm from '../realm';
import shortId from 'shortid';

export const getListTasks = (userId) => 
{
    const tasks = realm.objects('Task').filter((task) => task.userId === userId);
    return Promise.resolve(tasks);
};

export const addTask = (title, createAt,category,userId) => {
    let taskId = shortId.generate();
    const task = 
    {
        taskId,
        title,
        isCompleted: false,
        category,
        createAt,
        userId
    };
    let tasks = realm.objects('Task').filter((task) => task.userId === userId);
    tasks.push(task);

    return new Promise((resolve, reject) => {
    realm.write(() => {
      realm.create("Task", task)
      resolve(tasks);
    });
  });
};

export const removeTask = (userId, taskId) => {
  let tasks = realm.objects('Task').filter((task) => task.userId === userId);
  const task = tasks.find((task) => task.taskId === taskId);
  tasks = tasks.filter((task) => task.taskId !== taskId);
  return new Promise((resolve) => {
    realm.write(() => {
      realm.delete(task);
      resolve(tasks);
    });
  });
};

export const toggleTask = (userId,taskId) => {
    const tasks = realm.objects('Task').filter((task) => task.userId === userId);
    const task = tasks.find((task) => task.taskId === taskId);
    return new Promise((resolve) => 
    {
        realm.write(() => {
        task.isCompleted = !task.isCompleted;
        realm.create("Task",task,"modified")
        resolve(tasks);
    });
  });
};

export const editTask = (userId,newTask) => {
    const tasks = realm.objects('Task').filter((task) => task.userId === userId);
    let task = tasks.find((task) => task.taskId === newTask.taskId);
    console.log(newTask);
    return new Promise((resolve) => {
        realm.write(() => 
        {
            task.title = newTask.title;
            task.category = newTask.category;
            task.createAt = newTask.date;
            realm.create("Task",task,"modified")
            resolve(tasks);
        }
    );
  });
};

export const getTaskByCategory = (userId,category) => 
{
    const tasks = realm.objects('Task')
    .filter((task) => (task.userId === userId)&&(task.category === category));
    return Promise.resolve(tasks);
};

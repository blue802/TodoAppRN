// import realm from '../realm';
// import shortId from 'shortid';

// export const getListTasks = (email) => {
//   let tasks = [];
//   const user = realm.objects('User').find((user) => user.email === email);
//   if (!user) {
//     //user đăng nhập lần đầu
//     return new Promise((resolve, reject) => {
//       realm.write(() => {
//         realm.create('User', {email, tasks: []});
//         resolve(tasks);
//       });
//     });
//   } else {
//     tasks = user.tasks;
//     return Promise.resolve(tasks);
//   }
// };

// export const addTask = (email, name, date_complete, category) => {
//   if (!name) {
//     return Promise.reject('Task name is empty');
//   }
//   const id = shortId.generate();
//   const data = {
//     id,
//     name,
//     date_complete,
//     category,
//     status: false,
//     date_create: new Date(),
//   };

//   const {tasks} = realm.objects('User').find((user) => user.email === email);

//   return new Promise((resolve, reject) => {
//     realm.write(() => {
//       // realm.create('Task', data)
//       tasks.push(data);
//       resolve(tasks);
//     });
//   });
// };

// export const removeTask = (email, task) => {
//   const {tasks} = realm.objects('User').find((user) => user.email === email);
//   return new Promise((resolve) => {
//     realm.write(() => {
//       realm.delete(task);

//       resolve(tasks);
//     });
//   });
// };

// export const toggleTask = (task) => {
//   const tasks = realm.objects('Task');

//   return new Promise((resolve) => {
//     realm.write(() => {
//       task.status = !task.status;

//       resolve(tasks);
//     });
//   });
// };

// export const editTask = (email, id, newName, newCategory, newDate) => {
//   const {tasks} = realm.objects('User').find((user) => user.email === email);
//   const task = tasks.find((task) => task.id === id);
//   console.log(task);
//   return new Promise((resolve) => {
//     realm.write(() => {
//       task.name = newName;
//       task.category = newCategory;
//       task.date = newDate;
//       resolve(tasks);
//     });
//   });
// };

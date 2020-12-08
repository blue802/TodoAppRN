import Realm from 'realm';

const UserSchema = {
  name: 'User',
  properties: {
    displayName: "string",
    email: 'string',
    photoURL: 'string',
    uid: 'string'
  },
};
const TaskSchema = {
  name: 'Task',
  primaryKey:"taskId",
  properties: {
    taskId:"string",
    title:"string",
    isCompleted:"bool",
    category:"string",
    createAt:"date",
    userId:"string"
  },
};

export default new Realm({
  schema: [UserSchema,TaskSchema],
});

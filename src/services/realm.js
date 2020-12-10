import Realm from 'realm';

const UserSchema = {
  name: 'User',
  properties: {
    displayName: 'string',
    email: 'string',
    photoURL: 'string',
    uid: 'string',
  },
};
const TaskSchema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    isCompleted: 'bool',
    category: 'string',
    createAt: {type: 'date'},
    userId: 'string',
  },
};

export default new Realm({
  schema: [UserSchema, TaskSchema],
});

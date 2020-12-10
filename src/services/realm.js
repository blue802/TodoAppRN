import Realm from 'realm';

const UserSchema = {
  name: 'User',
  primaryKey: 'uid',
  properties: {
    uid: 'string',
    email: 'string',
    displayName: 'string',
    photoURL: 'string',
    score: 'int',
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

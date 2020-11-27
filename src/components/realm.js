import Realm from 'realm'

const TaskSchema = {
    name: 'Task',
    primaryKey: "id",
    properties: {
        id:"string",
        name: 'string',
        date_complete:"date",
        category:"string",
        status: 'bool',
        date_create:"date"
    }
}
const UserSchema = {
    name: 'User',
    primaryKey: "email",
    properties: {
        email:"string",
        tasks:{type:"list",objectType:"Task"},
    }
}

export default new Realm({
    schema: [TaskSchema,UserSchema]
})

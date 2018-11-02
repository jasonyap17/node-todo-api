const {mongoose} = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const {ObjectID} = require('mongodb');

var id = '5bdc74f7756d8036c1445ea6a';

// if (!ObjectID.isValid(id)) {
//     return console.log(`Invalid ID - ${id}`)
// };

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(`Todos: ${todos}`);
// }).catch((e) => console.log('find error ----- ', e));

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log(`Todo: ${todo}`);
// }).catch((e) => console.log(`findOne error ----- ${e}`));

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log(`Todo By Id: ${todo}`);
// }).catch((e) => console.log(`findbyId error ------ ${e}`));

User.findById(id).then((user) => {
    if (!user) {
        return console.log('Id not found');
    }
    console.log(`User By Id: ${user}`);
}).catch((e) => console.log(`findbyId error ------ ${e}`));
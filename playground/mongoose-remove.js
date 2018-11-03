const {mongoose} = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const {ObjectID} = require('mongodb');

var id = '5bdc74f7756d8036c1445ea6a';

// Todo.remove({}).then((result) => {
//     console.log(result);
// })

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findByIdAndDelete('5bdd202f48d12fd2cc19e745').then((todo) => {
    console.log(todo);
})
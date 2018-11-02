var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save()
     .then((doc) => res.send(doc))
     .catch((err) => res.status(400).send(err));
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }).catch((e) => res.status(400).send(err));    
});

app.listen(3000, () => {
    console.log('Started on port 3000');
})

module.exports = {
    app
};

// var saveUser = (user) => {
//     user.save()
//     .then((doc) => console.log('Saved user', doc))
//     .catch((err) => console.log(`===== ERROR===== ${err}`));
// }
// var newUser = new User({email: '   jason.yap@gmail.com '});
// saveUser(newUser);

// saveUser(new User({email: ' '}));
// saveUser(new User({ email: 'janna.aleeza@gmail.com ' }));
// var newTodo = new Todo( );

// newTodo.save()
//     .then((doc) => console.log('Saved todo', doc))
//     .catch((err) => console.log(err));

// var newTodo = new Todo({
//     text: 'Walk the dog',
//     completed: true,
//     completedAt: new Date()

// });
// newTodo.save()
//     .then((doc) => console.log('Saved todo', doc))
//     .catch((err) => console.log(err));



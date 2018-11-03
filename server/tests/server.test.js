const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [
    {
        _id: new ObjectID(),
        text: 'First test todo'
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completedAt: 33333
    }
];

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());

});

describe ('POST /todos', () => {
    it('should creare a new todo', (done) => {
        var text = 'Run a mile';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) =>{
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
                    done()
                }).catch((e) => done(e));
            })
    });

    it('should not create todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({  })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done()
                }).catch((e) => done(e));
            })

    })
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('should return a todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non ObjectIDs', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);

    })
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo and return a todo doc', (done) => {
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(todos[0]._id.toHexString()).then((todo) => {
                    expect(todo).toNotExist();
                    done()
                }).catch((e) => done(e));
            })
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non ObjectIDs', (done) => {
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);

    })
});

describe('PATCH /todos/:id', () => {
    it('should complete a Todo', (done) => {
        var id = todos[0]._id.toHexString();
        todos[0].text = 'vball practice';
        todos[0].completed = true;

        request(app)
            .patch(`/todos/${id}`)
            .send({ text: todos[0].text, completed: todos[0].completed})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number')
            })
            .end(done);
    });

    it('should clear completedAt when Todo is not completed', (done) => {
        var id = todos[1]._id.toHexString();
        todos[1].text = 'baseball practice';
        todos[1].completed = false;

        request(app)
            .patch(`/todos/${id}`)
            .send({ text: todos[1].text, completed: todos[1].completed })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[1].text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });

});
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: "test 1"
}, {
  _id: new ObjectID(),
  text: "test 2"
}];

// beforeEach((done) => {
//   Todo.remove({})
//       .then(() => {
//         return Todo.insertMany(todos);
//       })
//       .then(() => done())
//       .catch((e) => {
//           console.log(e);
//         });
// });

beforeEach((done) => {
  Todo.remove({}).then(() => done());
});

beforeEach((done) => {
  Todo.insertMany(todos).then(() => done());
});

describe('Post /todos', () => {
  it('should create a new todo', (done) => {
      var text = 'Test todo text';

      request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
          if(err){
            return done(err);
          }

          Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((err) => {
            done(err);
          });
        });
  });

  it('should not add bad todos', (done) => {
    var text = '';

    request(app)
      .post('/todos')
      .send({text})
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((err) => {
          done(err);
        })
      });
  });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should get todo doc', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found', (done) => {
      request(app)
        .get(`/todos/${new ObjectID()}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
      request(app)
        .get(`/todos/123557sdfg`)
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo doc', (done) => {
      request(app)
        .delete(`/todos/${todos[0]._id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(todos[0]._id.toHexString());
        })
        .end((err, res) => {
          if(err){
            return done(err);
          }

          Todo.findById(todos[0]._id).then((todo) => {
            expect(todo).toNotExist();
            done();
          }, e => done(e));
        });
    });

    it('should return 404 if todo not found', (done) => {
      request(app)
        .delete(`/todos/${new ObjectID()}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
      request(app)
        .delete(`/todos/123557sdfg`)
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo doc', (done) => {
      request(app)
        .patch(`/todos/${todos[0]._id}`)
        .send({text: 'bey update aho'})
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe('bey update aho');
        })
        .end((err, res) => {
          if(err){
            return done(err);
          }

          Todo.findById(todos[0]._id).then((todo) => {
            expect(todo).toExist();
            expect(todo.text).toBe('bey update aho');
            done();
          }, e => done(e));
        });
    });

    it('should clear completedAt when todo is not completed', (done) => {
      request(app)
        .patch(`/todos/${todos[1]._id}`)
        .send({completed: false})
        .expect(200)
        .end((err, res) => {
          if(err){
            return done(err);
          }

          Todo.findById(todos[1]._id).then((todo) => {
            expect(todo).toExist();
            expect(todo.completed).toBe(false);
            expect(todo.completedAt).toNotExist();
            done();
          }, e => done(e));
        });
    });

});

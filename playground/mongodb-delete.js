// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if(error){
    console.log('Unable to connect to Mongodb server!');
    return;
  }

  console.log('Connected to Mongodb server!');

  // db.collection('Todos').deleteMany({text: 'ay 7aga'}).then((res) => {
  //   console.log(res);
  // });

  // db.collection('Todos').deleteOne({text: 'ay 7aga'}).then((res) => {
  //   console.log(res);
  // });

  db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
    console.log(res);
  });

  // db.close();
});

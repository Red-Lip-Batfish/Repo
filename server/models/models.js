const mongoose = require('mongoose');
mongoose.pluralize(null);

const Schema = mongoose.Schema;

const MONGO_URI =
  'mongodb+srv://project:12345@todocalendar.dvd0e.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'jobs',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const personSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lists: {
    type: Array
  }
});

const people = mongoose.model('people', personSchema);

const taskArrSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  description: String,
  user: String,
});

const taskArr = mongoose.model('taskArr', taskArrSchema);

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  taskArr: {
    type: Array,
    default: [],
  },
});

const list = mongoose.model('list', listSchema);

module.exports = { people, list, taskArr };

/*

{
    {
        taskContainer: "front end",
        taskArr: [{task: "make a button", user: false}, {task: "make a form", user: false]
                
    }
    {
        taskContainer: "back end",
        taskArr: [{task: "make a button", user: false}, {task: "make a form", user: false]

}
*/

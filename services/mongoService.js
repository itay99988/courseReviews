var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/coursesdb');

var Schema = mongoose.Schema;

// create a schema
var courseSchema = new Schema({
  num: Number,
  cname: String,
  side: String,
  fac: String,
  lecture: String,
  exam: String
});

// we need to create a model using it
var Course = mongoose.model('Course', courseSchema);

// make this available to our users in our Node applications
module.exports = Course;
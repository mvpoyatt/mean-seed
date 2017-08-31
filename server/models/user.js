var mongoose = require('mongoose');
var schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = schema({
  email: {type: String, required: true}
})
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
 
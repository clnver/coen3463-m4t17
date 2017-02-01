var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    fname: String,
    lname: String,
    password: String,
    username: {type:String,
    	required: [true, 'Email is required.'],
    	validate: {
        validator: function(v) {
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
          },
          message: 'Email is invalid.'
        },
    	}
	}, { collection: 'users' });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
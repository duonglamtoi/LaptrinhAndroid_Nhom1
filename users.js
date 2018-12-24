var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: String,
    admin: Boolean,
    created_at: Number,
    updated_at: Number
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('Users', userSchema);

// make this available to our users in our Node applications
module.exports = User;

//
User.AddUser = function (data, callback) {
    if (!data) return callback(-1);
    if (!data.uname || data.uname.length < 3) return callback(-2);
    if (!data.pass || data.pass.length < 6) return callback(-3);
    
    User.findOne({ username: data.uname }, function (err, _doc) {
        if (err) return callback(-101);
        
        if (_doc) {
            console.log(_doc.username + ' da ton tai');
            return callback(-4);
        }
        var new_user = new User;
        new_user.username = data.uname;
        new_user.password = data.pass;
        new_user.email = data.email != null ? data.email : '';
        new_user.admin = 0;
        new_user.save(function (err) {
            if (err) return callback(-101);
            else {
                console.log('User saved successfully!'); 
                return callback(1);
            }            
        });        
    });
    
}
User.login1 = function (data, callback) {
    if (!data) return callback(-1);
    if (!data.username || data.username.length < 3) return callback(-2);
    if (!data.password || data.password.length < 6) return callback(-3);

	User.findOne({ username: data.username,password: data.password }, function (err, _doc) {
        if (err) return callback(-101);

        if (_doc) {
            console.log(_doc.username + ': Dang nhap thanh cong');
			console.log('Email: ' + _doc.email);
            return callback(1);
        }
        else{
			console.log('Dang nhap that bai');
			return callback(0);
		}
    });
}
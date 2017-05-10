const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    social: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,

    },
    location: {
      type: DataTypes.STRING,

    },
    bio: {
      type: DataTypes.TEXT('medium'),

    }
  },
  {timestamps: false});

  User.setPassword = function(raw, done) {
    // todo: encrypt it
    this.password = ecryptedPassword;
    done(false, this);
  }

  User.comparePassword = function(raw, done) {
    
  }
  return User;
}


// setPassword: function(raw, done) {}
// comparePassword: function(raw, done) {}

// db.User.setPassword('myPassword', function(err, user) {
// if (!err)
//   user.save();
// })

const bcrypt = require('bcrypt');

module.exports = function(passport, LocalStrategy, User) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    }); // if you are using sessions



    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    }); // if you are using sessions



    passport.use(new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {

        // check password, and return user if successful
        User.findOne({
            where : { email : email }
        }).done(function(user) {
            if(!user) {
                return done(null, false);
            }
            bcrypt.compare(password, user.password, (err, res) => {
              return res ? done(null, user): done(null, false);
            });
        });
    }));
};
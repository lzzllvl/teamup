
module.exports = function(passport, LocalStrategy, User) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    }); // if you are using sessions



    passport.deserializeUser(function(id, done) {
      User.find({where: {id: id}}).then(function(err, user){
        if(!err)
          done(null, user);
        else
          done(err, null);
      });
    });



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
            User.comparePassword(password, user.password, (err, result) => {
              console.log(result, err)
              if(!err)
                return result ? done(null, user): done(null, false);
              else
                throw err;
            });
        });
    }));
};
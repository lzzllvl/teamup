

module.exports = function(passport, LocalStrategy) {

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
     User.findOne({ 'local.email' : email },
     function(err, user) {
       if (err) return done(err);

       if (!user) return done(null, false);

       if (!user.validPassword(password)){
         return done(null, false);
       }

       else
         return done(null, user); // all good return user
     });
   })
 )
};
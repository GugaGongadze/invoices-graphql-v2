const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'username' },
    (username, password, done) => {
      User.findOne({ username: username.toLowerCase() }, (err, user) => {
        if (err) return done(err);

        if (!user) return done(null, false, 'Invalid Credentials');

        user.comparePassword(password, (err, isMatch) => {
          if (err) return done(err);

          if (isMatch) {
            return done(null, user);
          }

          return done(null, false, 'Invalid Credentials');
        });
      });
    }
  )
);

function signup({ username, email, password, req }) {
  if (req.user) {
    throw new Error('You cannot register as long as you are logged in.');
  }

  const user = new User({
    username,
    email,
    created: Date.now(),
    activated: Date.now(),
    password
  });

  if (!username || !email || !password) {
    throw new Error('You must provide an username, email and password');
  }

  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        throw new Error('Email is already in use');
      }

      return user.save();
    })
    .then(user => {
      return new Promise((res, rej) => {
        req.logIn(user, err => {
          if (err) rej(err);

          res(user);
        });
      });
    });
}

function login({ username, password, req }) {
  return new Promise((res, rej) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        rej('Invalid credentials.');
      }

      req.logIn(user, (err) => {
        if (err) rej(err);
        res(user);
      });
    })({ body: { username, password } });
  });
}

module.exports = { signup, login };

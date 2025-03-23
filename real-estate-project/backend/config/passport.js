const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config({ path: "./backend/.env" });
const pool = require("./db");
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findByGoogleId(profile.id);

        if (user) {
          return done(null, user);
        } else {
          const newUser = await User.create(
            profile.id,
            profile.emails[0].value,
            profile.displayName,
            profile.photos[0].value
          );

          return done(null, newUser);
        }
      } catch (err) {
        console.error("Error during user authentication:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      done(null, user);
    } else {
      done(null, false); // If no user is found
    }
  } catch (err) {
    console.error("Error during deserialization:", err);
    done(err, null);
  }
});

module.exports = passport;

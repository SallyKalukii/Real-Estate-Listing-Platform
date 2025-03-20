const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config({ path: "./backend/.env" });
const pool = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const res = await pool.query(
          "SELECT * FROM users WHERE google_id = $1",
          [profile.id]
        );

        if (res.rows.length > 0) {
          return done(null, res.rows[0]);
        } else {
          const newUser = await pool.query(
            "INSERT INTO users (google_id, email, name, profile_pic) VALUES ($1, $2, $3, $4) RETURNING *",
            [
              profile.id,
              profile.emails[0].value,
              profile.displayName,
              profile.photos[0].value,
            ]
          );
          return done(null, newUser.rows[0]);
        }
      } catch (err) {
        console.error("Error during user authentication:", err);
        return done(err, null);
      }
    }
  )
);

// passport.use(
//   new GoogleStrategy(
//       {
//           clientID: process.env.GOOGLE_CLIENT_ID,
//           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//           callbackURL: '/auth/google/callback',
//       },
//       async (accessToken, refreshToken, profile, done) => {
//           try {
//               // Find or create user in the database
//               let user = await User.findByGoogleId(profile.id);
//               if (!user) {
//                   user = await User.create(
//                       profile.id,
//                       profile.emails[0].value,
//                       profile.displayName
//                   );
//               }
//               done(null, user);
//           } catch (err) {
//               done(err, null);
//           }
//       }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (res.rows.length > 0) {
      done(null, res.rows[0]);
    } else {
      done(null, false);  // If no user is found
    }
  } catch (err) {
    console.error("Error during deserialization:", err);
    done(err, null);
  }
});

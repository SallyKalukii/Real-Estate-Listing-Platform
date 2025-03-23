const passport = require("passport");

// Redirect to Google OAuth
const redirectToGoogle = (req, res) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
};

// Handle Google OAuth callback
const handleGoogleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    (err, user) => {
      if (err) return next(err);
      if (!user) return res.redirect("/login");

      // Log in the user and create a session

      req.login(user, (err) => {
        if (err) return next(err);
        res.redirect("/");
      });
    }
  )(req, res, next);
};

module.exports = {
  redirectToGoogle,
  handleGoogleCallback,
};

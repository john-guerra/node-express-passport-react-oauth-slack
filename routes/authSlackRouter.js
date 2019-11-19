var express = require("express");
var router = express.Router();
const passport = require("passport");

// Initiates basic Sign in With Slack flow
router.get("/slack", passport.authenticate("slack"));

const frontURL = "http://157.253.162.69:3000";

// Completes the OAuth flow.
router.get(
  "/slack/callback",
  passport.authenticate("slack"), // Failure triggers the default failure handler (401 Unauthorized)
  (req, res) => {
    // Successful authentication redirects home.
    res.redirect(`${frontURL}/`);
  }
);

// Handle removing the user from the session
router.post("/logout", (req, res) => {
  req.logout();
  res.redirect(`${frontURL}/`);
});

router.get("/getUser", (req, res) => res.json(req.user || null));

module.exports = router;

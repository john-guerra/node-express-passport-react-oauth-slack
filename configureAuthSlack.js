const passport = require("passport");
const SlackStrategy = require("@aoberoi/passport-slack").default.Strategy;
const session = require("express-session");

const configureAuthSlack = app => {
  // Configure the Slack Strategy
  passport.use(
    new SlackStrategy(
      {
        clientID: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET
      },
      (accessToken, scopes, team, extra, profiles, done) => {
        console.log("Successful Auth", accessToken, profiles);
        done(null, profiles.user);
      }
    )
  );

  // When using Passport's session functionality, you need to tell passport how to
  // serialize/deserialize the user object to the session store
  passport.serializeUser((user, done) => {
    // Simplest possible serialization
    done(null, JSON.stringify(user));
  });

  passport.deserializeUser((json, done) => {
    // Simplest possible deserialization
    done(null, JSON.parse(json));
  });

  app.use(
    session({
      cookie: {
        // secure should be enabled in a production app, but disabled for simplicity
        // secure: true,
      },
      resave: false,
      saveUninitialized: false,
      secret: "John loves this!"
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = configureAuthSlack;



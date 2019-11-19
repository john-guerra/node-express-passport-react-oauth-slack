var express = require("express");
var router = express.Router();

// // Home page that doesn't require logging in, but displays login state. See 'views/index.ejs'
// router.get("/", (req, res) => {
//   res.render("index", {
//     user: req.user
//   });
// });

module.exports = router;

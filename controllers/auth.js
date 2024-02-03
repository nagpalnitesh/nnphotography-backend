const User = require("../models/user");
var Jwt = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");

var { check, validationResult } = require("express-validator");

// exports.signup = (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({
//       error: errors.array()[0].msg,
//     });
//   }
//   const user = new User(req.body);
//   user
//     .save()
//     .then((user) => {
//       res.json({
//         name: user.name,
//         lastname: user.lastname,
//         email: user.email,
//         id: user._id,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match",
        });
      }
      // create token
      const token = Jwt.sign({ _id: user._id }, process.env.SECRET);
      // put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });
      // send response to frontend
      const { _id, name, email, role } = user;
      return res.json({ token, user: { _id, name, email, role } });
    })
    .catch((err) => console.log(err));
};
exports.getUserById = (req, res, next, id) => {
  User.findById(id)
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "No user found",
        });
      }
      req.profile = user;
      next();
    })
    .catch((err) => console.log(err));
};

// protected routes
exports.isSignedIn = jwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied",
    });
  }
  next();
};

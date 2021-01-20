const postsModel = require('../posts/posts-model');
const usersModel = require('../users/users-model');

function logger(req, res, next) {
  // do your magic!
  console.log(`Request Method: ${req.method}, Request url: ${req.url}, Request timestamp: ${new Date().toISOString()}`);
  next();
}

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  usersModel.getById(id)
    .then(userFound => {
      if (userFound) {
        req.user = userFound;
        next();
      } else {
        res.status(404).json({ message: "user not found" })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "something went wrong"})
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else {
    if (!req.body.name) {
      res.stats(400).json({ message: "missing required name field" })
    } else {
      next();
    }
  }
}

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  postsModel.findById(id)
    .then(postFound => {
      if (postFound) {
        req.post = postFound
        next()
      } else {
        res.status(404).json({ message: "post not found" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong!" })
    })
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else {
    if (!req.body.text) {
      res.status(400).json({ message: "missing required text field" })
    } else {
      next();
    }
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePostId, validatePost };
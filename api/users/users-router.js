const express = require('express');

const router = express.Router();

const {
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware');
const usersModel = require('./users-model');
const postsModel = require('../posts/posts-model');

router.post('/', validateUser, async (req, res) => {
  // do your magic!
  // this needs a middleware to check that the request body is valid
  try {
    const newUser = await usersModel.insert(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "something went wrong" })
  }
});

router.get('/', async (req, res) => {
  // do your magic!
  try {
    const users = await usersModel.get();
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: "cannot get user data" })
  }
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  usersModel.remove(req.params.id)
    .then(deleted => {
      res.status(200).json(deleted)
    })
    .catch(err => {
      res.status(500).json({ message: "somethign went wrong while deleting user" })
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  usersModel.update(req.params.id, req.body)
    .then(updated => {
      res.status(200).json(updated)
    })
    .catch(err => {
      res.status(500).json({ message: "something went wrong while updating user" })
    })
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postItem = {
    text: req.body.text,
    user_id: req.user.id
  }
  try {
    const newPost = await postsModel.insert(postItem)
    res.status(201).json(newPost)
  } catch (err) {
    res.status(500).json({ message: "something went wrong while creating new post"})
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  try {
    const posts = await usersModel.getUserPosts(req.params.id);
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({ message: "somethign went wrong while getting users posts" })
  }
});

// do not forget to export the router
module.exports = router;
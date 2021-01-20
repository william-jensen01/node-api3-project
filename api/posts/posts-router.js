const express = require('express');
const postsModel = require('./posts-model');
const { validatePostId, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  // do your magic!
  const posts = await postsModel.get();
  try {
    if (posts) {
      res.status(200).json(posts)
    } else {
      res.status(400).json({ message: "cannot load posts"})
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong" })
  }
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  try {
    const deleted = await postsModel.remove(req.params.id)
    if (deleted) {
      res.status(200).json(deleted)
    } else {
      res.status(404).json({ message: "unable to delete" })
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong" })
  }
});

router.put('/:id', validatePostId, validatePost, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  try {
    const updated = await postsModel.update(req.params.id, req.body)
    if (updated) {
      res.status(200).json(updated)
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong" })
  }
});

// do not forget to export the router
module.exports = router;
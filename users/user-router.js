const express = require('express');

const db = require('../data/db-config.js');
const Users = require('./user-model');

const router = express.Router();

router.get('/', (req, res) => {

  Users.all()
    .then(users => {
      res.json(users);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to get users' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Users.findById({ id })
    .then(users => {
      const user = users[0];

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Could not find user with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get user' });
    });
});

router.post('/', (req, res) => {
  const userData = req.body;

  Users.add(userData)
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to create new user' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Useres.update(id, changes)
    .then(count => {
      if (count) {
        res.json({ update: count });
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update user' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete user' });
    });
});

// List all posts for a user
router.get('/:id/posts', (req, res) => {

  /* 
  SELECT posts.contents, users.username as saidBy
  FROM posts
  JOIN users ON posts.user_id = users.id 
  */

  Users.getPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: 'OOOOPS' })
    })
})

module.exports = router;
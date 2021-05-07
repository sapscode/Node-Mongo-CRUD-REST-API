const express = require('express');
const router = express.Router();
const User = require('../models/user')
const { getUser, createUser, getUserById, deleteUser, updateUser, getUserMiddleware  } = require('../controllers/user.js');

//all users here start with /users 
router.get('/', getUser);

router.get('/:id', getUserMiddleware, getUserById);

router.post('/', createUser);

router.delete('/:id', getUserMiddleware, deleteUser);

router.patch('/:id', getUserMiddleware, updateUser);

module.exports = router;
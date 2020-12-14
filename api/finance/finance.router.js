const express = require('express');

const {
  addTransaction,
  getData,
  authorize,
  validateId,
  deleteContact,
} = require('./finance.controller.js');

// const authorize = require('../users/user.controller.js');
const userRouter = express.Router();

userRouter.post('/addcontact', authorize, addTransaction);
userRouter.get('/contact', authorize, getData);
userRouter.delete('/delete/:id', validateId, deleteContact);

module.exports = userRouter;

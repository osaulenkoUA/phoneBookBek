const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../helpers/error.js');
const financeModel = require('./finance.model.js');
const { ObjectId } = require('mongodb');

async function addTransaction(req, res, next) {
  try {
    req.body.userId = req.userId;
    const contact = await financeModel.create(req.body);
    return res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
}
async function getData(req, res, next) {
  try {
    console.log('-------------->', req.userId);
    const allContacts = await financeModel.find({ userId: req.userId });
    return res.status(200).json(allContacts);
  } catch (err) {
    next(err);
  }
}

async function authorize(req, res, next) {
  try {
    const authorizationHeader = req.get('Authorization') || '';
    const token = authorizationHeader.replace('Bearer ', '');
    let userId;

    try {
      userId = await jwt.verify(token, process.env.JWT_SECRET).id;
    } catch (err) {
      next(new UnauthorizedError('User not authorized'));
    }

    req.userId = userId;

    next();
  } catch (err) {
    next(err);
  }
}
async function deleteContact(req, res, next) {
  try {
    const contactId = req.params.id;
    const contact = await financeModel.findByIdAndDelete({ _id: contactId });
    !contact ? res.status(404).send() : res.status(200).json();
  } catch (err) {
    next();
  }
}

function validateId(req, res, next) {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send();
  }

  next();
}
module.exports = {
  addTransaction,
  getData,
  authorize,
  deleteContact,
  validateId,
};

const express = require('express');
const router = express.Router();
const logger = require('tracer').colorConsole();
const _ = require('lodash');
const createError = require('http-errors');
const uuid = require('shortid');
const jwt = require('jsonwebtoken');
const user = require('../db/schema/user').createModel();
const operations = require('../db/operations');
const { auth } = require("../auth/auth");
const { secret } = require('../auth/config');
const { checkAuth } = require("../auth/auth");
auth();

router.get('/signin', async (request, response) => {
  try {
    const { email } = request.query;
    const resp = await operations.findDocumentsByQuery(user, { email }, { _id: 0, __v: 0 })
    if (_.isEmpty(resp)) {
      throw createError(401, 'Invalid Credentials');
    }
    const token = jwt.sign(resp[0], secret, {
      expiresIn: 1008000
    });
    resp[0]['token'] = "JWT " + token;
    return response.json(resp[0]).status(200);
  } catch (ex) {
    logger.error(ex);
    const message = ex.message ? ex.message : 'Error while fetching credentials';
    const code = ex.statusCode ? ex.statusCode : 500;
    return response.status(code).json({ message });
  }
});

router.post('/signup', async (request, response) => {
  try {
    const { email } = request.body;
    const { password } = request.body;
    const { name } = request.body;
    const resp = await operations.findDocumentsByQuery(user, { email }, { _id: 0, __v: 0 })
    if (resp.length === 1) {
      throw createError(409, 'Email Id already registered. Try logging in');
    }
    const data = {
      "id": uuid.generate(),
      name,
      email,
      password,
      "college": request.body.college
    };
    await operations.saveDocuments(user, data, { runValidators: true })
    return response.status(200).json({ message: 'Signup Successful' });
  } catch (error) {
    logger.error(JSON.stringify(error));
    const message = error.message ? error.message : 'Error Ocurred at Server';
    const code = error.statusCode ? error.statusCode : 500;
    return response.status(code).json({ message }).status(code);
  }
});

router.get('/user/:id/cards', checkAuth, async (request, response) => {
  try {
    const { id } = request.params;
    const resp = await operations.findDocumentsByQuery(user, { id }, { _id: 0, __v: 0 })
    return response.json(resp[0]['cards']).status(200);
  } catch (ex) {
    logger.error(ex);
    const message = ex.message ? ex.message : 'Error while fetching cards';
    const code = ex.statusCode ? ex.statusCode : 500;
    return response.status(code).json({ message });
  }
});

router.post('/user/:id/cards', checkAuth, async (request, response) => {
  try {
    const { id } = request.params;
    request.body.id = uuid.generate();
    console.log(request.body)
    await operations.updateField(user, id, { $push: { cards: request.body } })
    return response.json(request.body).status(200);
  } catch (ex) {
    logger.error(ex);
    const message = ex.message ? ex.message : 'Error while fetching cards';
    const code = ex.statusCode ? ex.statusCode : 500;
    return response.status(code).json({ message });
  }
});

module.exports = router;

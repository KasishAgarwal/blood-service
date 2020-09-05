const express = require('express');
const router = express.Router();
const controller = require('./login.controller');
const validation = require('./login.validation');
// const validationR = require('../registration/registration.validation');

router.route('/login').post(controller.login);
router.route('/read').get(validation.authToken, controller.getDataDB);
router.route('/image').get(validation.authToken, controller.getImage);
router.route('/update/:id').put(validation.authToken, controller.updateDataDB);
router.route('/delete/:id').delete(validation.authToken, controller.deleteDataDB);

module.exports = router;



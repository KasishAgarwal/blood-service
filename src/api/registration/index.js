const express = require('express');
const router = express.Router();
const controller = require('./registration.controller');
const validation = require('./registration.validation');

router.route('/create').post(validation.validate, controller.createDataDB);
router.route('/upload').post(controller.imageUpload);

router.route('/jsonRead').get(controller.getUserByJSON);
router.route('/jsonCreate').post(controller.createUserByJSON);
router.route('/jsonUpdate/:id').put(controller.updateUserByIdJSON);
router.route('/jsonDelete/:id').delete(controller.deleteUserByIdJSON);

// router.route('/').get(controller.getUser);
// router.route('/create').post(controller.createUser);
// router.route('/:id').get(controller.getUserById);

module.exports = router;
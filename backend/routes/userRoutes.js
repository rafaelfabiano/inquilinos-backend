const express = require('express');
const userController = require('../controllers/userController.js');
const router = express.Router();

// Criar um novo usuário
router.post('/createUser', userController.createUser);

module.exports = router;

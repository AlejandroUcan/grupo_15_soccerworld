const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/userController');

// Middlewares
const uploadFile = require('../middlewares/multerUserMiddleware');
const validations = require('../middlewares/validateRegisterUserMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, usersController.login);

// Procesar el login
router.post('/login', usersController.loginProcess);

// Perfil de Usuario
router.get('/profile/', authMiddleware, usersController.profile);

// Logout
router.get('/logout/', usersController.logout);

// Formulario de modificación
router.get('/:id/edit', usersController.edit);

// Procesar la actualización
router.put('/:id', uploadFile.single('avatar'), validations, usersController.update);

module.exports = router;
const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/signup',userController.register);
router.post('/login',userController.login);
router.get('/status',verifyToken,userController.statusOfApplications);
module.exports = router;

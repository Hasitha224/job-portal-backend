const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/signup',userController.register);
router.post('/login',userController.login);
router.get('/uservacancy',verifyToken);
router.get('/apply',verifyToken);
router.get('/status',verifyToken);
module.exports = router;

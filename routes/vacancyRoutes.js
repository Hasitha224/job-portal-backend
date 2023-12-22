const express = require('express');
const router = express.Router();
const VacancyController = require('../controllers/vacancyController');
const verifyToken = require('../Middleware/authMiddleware');

router.post('/create',verifyToken,VacancyController.vacancyCreate);
router.get('/get-all',verifyToken,VacancyController.getAll);
router.delete('/deleteById/:_id',verifyToken,VacancyController.deleteById);
router.get('getById/:_id',VacancyController.getVacancyById);
router.put('/edit/:_id',verifyToken,VacancyController.editVacancy);

module.exports = router;
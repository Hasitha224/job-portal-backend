const express = require('express');
const router = express.Router();
const VacancyController = require('../controllers/vacancyController');

router.post('/create',VacancyController.vacancyCreate);
router.get('/get-all',VacancyController.getAll);
router.delete('/deleteById/:_id',VacancyController.deleteById);
router.get('getById/:_id',VacancyController.getVacancyById);
router.put('/edit/:_id',VacancyController.editVacancy);

module.exports = router;
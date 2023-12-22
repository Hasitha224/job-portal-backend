const express = require('express');
const router = express.Router();
const VacancyController = require('../controllers/vacancyController');

router.get('/vacancies/get-all',VacancyController.getAll);

module.exports = router;
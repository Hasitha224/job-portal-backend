const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const verifyToken = require('../Middleware/authMiddleware');

router.post('/create',verifyToken,applicationController.submitApplication);
router.get('/getByPending',applicationController.getPending);
router.get('/getByAccepted',applicationController.getAccepted);
router.get('/getByRejected',applicationController.getRejected);
router.patch('/editStatusAccept/:_id',applicationController.editStatusToAccept);
router.patch('/editStatusReject/:_id',applicationController.editStatusToReject);
router.delete('/deleteById/:_id',applicationController.deleteById);

module.exports = router;

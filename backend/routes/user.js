const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', userController.createUser)

router.get('/', userController.getUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.get('/unique/names', userController.getUniqueNames);

router.get('/average/scores', userController.getAverageScoresAndDurations);

router.get('/average-scores', userController.getAverageScores);

router.get('/export/conversations', userController.exportUserConversationsToPDF);


module.exports = router;

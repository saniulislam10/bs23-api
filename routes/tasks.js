const express = require('express');
const router = express.Router();
const taskController = require('../controller/tasks');

router.get('/get-all', taskController.getAll);
router.get('/get/:id', taskController.getById);
router.post('/add', taskController.addTask);
router.put('/edit/:id', taskController.updateTask);
router.delete('/delete/:id', taskController.deleteTask);

module.exports = router;

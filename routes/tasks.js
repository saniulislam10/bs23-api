const express = require('express');
const router = express.Router();
const taskController = require('../controller/tasks');

router.get('/', taskController.getAll);
router.get('/:id', taskController.getById);
router.post('/', taskController.addTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;

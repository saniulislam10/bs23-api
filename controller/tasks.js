
const Task = require('../models/tasks');

exports.getAll = async (req, res, next) => {
    try {

        const data = await Task.find();

        return res.status(200).json({
            data: data,
            message: "Tasks fetched successfully",
        });
    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = "Something went wrong on database operation!";
        }
        next(err);
    }
};

exports.getById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({
      data: task,
      message: 'Task fetched successfully',
    });
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    err.message = 'Error fetching task';
    next(err);
  }
};

exports.addTask = async (req, res, next) => {
  try {
    const taskData = req.body;

    const newTask = new Task(taskData);
    const savedTask = await newTask.save();

    return res.status(201).json({
      data: savedTask,
      message: 'Task created successfully',
    });
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    err.message = 'Error creating task';
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const updateData = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({
      data: updatedTask,
      message: 'Task updated successfully',
    });
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    err.message = 'Error updating task';
    next(err);
  }
};


exports.deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    err.message = 'Error deleting task';
    next(err);
  }
};

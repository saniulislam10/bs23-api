const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');  // Import the validator package for string validation

const brandSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Task name is required'],
      minlength: [3, 'Task name must be at least 3 characters long'],
      maxlength: [100, 'Task name cannot exceed 100 characters'],
      trim: true, // Removes extra spaces at the beginning and end
    },
    dueDate:{
      type: Date,
      required: false
    },
    status: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
    
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model('Task', brandSchema);

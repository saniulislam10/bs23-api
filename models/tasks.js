const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');  // Import the validator package for string validation

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      minlength: [3, 'Brand name must be at least 3 characters long'],
      maxlength: [100, 'Brand name cannot exceed 100 characters'],
      trim: true, // Removes extra spaces at the beginning and end
    },
    slug: {
      type: String,
      required: false,
      lowercase: true,
      unique: true,
      validate: {
        validator: function(value) {
          // Ensure the slug is alphanumeric and may contain dashes
          return /^[a-z0-9-]+$/.test(value);
        },
        message: '{VALUE} is not a valid slug. Only lowercase alphanumeric characters and dashes are allowed.'
      },
      trim: true,
    },
    link: {
      type: String,
      required: false,
      validate: {
        validator: function(value) {
          // Validate URL using validator package
          return value ? validator.isURL(value) : true;
        },
        message: '{VALUE} is not a valid URL'
      },
    },
    logo: {
      type: String,
      required: false,
      validate: {
        validator: function(value) {
          // Ensure the logo follows the 'brands/filename.extension' pattern
          return /^brands\/[a-zA-Z0-9_-]+\.(png|jpg|jpeg|gif|svg)$/.test(value);
        },
        message: '{VALUE} is not a valid logo format. It should be in the format "brands/filename.extension"',
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model('Brand', brandSchema);

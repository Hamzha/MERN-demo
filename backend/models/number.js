const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Number', numberSchema);

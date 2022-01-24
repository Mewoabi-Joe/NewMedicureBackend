const mongoose = require('mongoose');

const temperatureSchema = mongoose.Schema({
  value: { type: Number, required: true },
  date: { type: Date, required: true },
  userId:{ type: String, required:true}
});

module.exports = mongoose.model('Temperature', temperatureSchema);
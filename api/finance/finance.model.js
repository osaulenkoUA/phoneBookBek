const mongoose = require('mongoose');
const { Schema } = mongoose;

const financeSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  userId: { type: String, required: false },
});

const financeModel = mongoose.model('Contact', financeSchema);

module.exports = financeModel;

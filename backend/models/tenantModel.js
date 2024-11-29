const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  kitnetSize: { type: String, required: true },
  isInadimplent: { type: Boolean, required: true },
  inadimplenceTime: { type: Number, required: false },
  rentValue: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Tenant', tenantSchema);

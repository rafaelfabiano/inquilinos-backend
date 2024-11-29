const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  kitnetSize: { type: String, required: true },
  isInadimplent: { type: Boolean, required: true },
  inadimplenceTime: { type: Number, required: false },
  rentValue: { type: Number, required: true },
}, { timestamps: true });

// Middleware "pre-save" para garantir que o rentValue seja um número válido
tenantSchema.pre('save', function (next) {
  if (this.rentValue && typeof this.rentValue === 'string') {
    // Substitui a vírgula por ponto, caso o valor tenha sido passado com vírgula
    this.rentValue = parseFloat(this.rentValue.replace(',', '.'));
  }
  next();
});

module.exports = mongoose.model('Tenant', tenantSchema);
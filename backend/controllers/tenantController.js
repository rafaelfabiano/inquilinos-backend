const Tenant = require('../models/tenantModel'); // Importa o modelo de inquilino

// Criar um novo inquilino
const createTenant = async (req, res) => {
  try {
    const tenant = new Tenant(req.body); // Cria o inquilino com base nos dados recebidos
    await tenant.save(); // Salva no banco de dados
    res.status(201).json({ msg: 'Inquilino criado com sucesso!', tenant });
  } catch (err) {
    console.error('Erro ao criar inquilino:', err); // Log de erro no servidor
    res.status(500).json({ msg: 'Erro ao criar inquilino', error: err.message });
  }
};

// Listar todos os inquilinos
const getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find(); // Recupera todos os inquilinos
    res.status(200).json(tenants);
  } catch (err) {
    console.error('Erro ao listar inquilinos:', err);
    res.status(500).json({ msg: 'Erro ao listar inquilinos', error: err.message });
  }
};

// Obter inquilino pelo ID
const getTenantById = async (req, res) => {
  const { id } = req.params;
  try {
    const tenant = await Tenant.findById(id);
    if (!tenant) {
      return res.status(404).json({ msg: 'Inquilino não encontrado' });
    }
    res.status(200).json(tenant);
  } catch (err) {
    console.error('Erro ao obter inquilino:', err);
    res.status(500).json({ msg: 'Erro ao obter inquilino', error: err.message });
  }
};

// Atualizar inquilino
const updateTenant = async (req, res) => {
  const { id } = req.params;
  try {
    const tenant = await Tenant.findByIdAndUpdate(id, req.body, { new: true });
    if (!tenant) {
      return res.status(404).json({ msg: 'Inquilino não encontrado' });
    }
    res.status(200).json({ msg: 'Inquilino atualizado com sucesso', tenant });
  } catch (err) {
    console.error('Erro ao atualizar inquilino:', err);
    res.status(500).json({ msg: 'Erro ao atualizar inquilino', error: err.message });
  }
};

// Excluir inquilino
const deleteTenant = async (req, res) => {
  const { id } = req.params;
  try {
    const tenant = await Tenant.findByIdAndDelete(id);
    if (!tenant) {
      return res.status(404).json({ msg: 'Inquilino não encontrado' });
    }
    res.status(200).json({ msg: 'Inquilino excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir inquilino:', err);
    res.status(500).json({ msg: 'Erro ao excluir inquilino', error: err.message });
  }
};

module.exports = {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
};

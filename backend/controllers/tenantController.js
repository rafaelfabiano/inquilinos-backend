const mongoose = require('mongoose'); // Importa mongoose
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
  const { cpf } = req.body;  // Extrai o CPF dos dados enviados no corpo da requisição

  // Verificar se o CPF foi fornecido
  if (!cpf) {
    return res.status(400).json({ message: "O CPF do inquilino é obrigatório." });
  }

  try {
    // Buscar o inquilino pelo CPF
    const updatedTenant = await Tenant.findOneAndUpdate(
      { cpf: cpf },  // Busca o inquilino pelo CPF
      req.body,       // Dados para atualização
      { new: true }   // Retorna o inquilino atualizado
    );

    // Se não encontrar um inquilino com esse CPF, retorna erro
    if (!updatedTenant) {
      return res.status(404).json({ message: "Inquilino não encontrado com esse CPF." });
    }

    // Retorna o inquilino atualizado
    res.status(200).json(updatedTenant);
  } catch (error) {
    console.error("Erro ao atualizar inquilino:", error);
    res.status(500).json({ message: "Erro ao atualizar inquilino", error: error.message });
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

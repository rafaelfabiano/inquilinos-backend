const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');

// Definir as rotas para inquilinos
router.post('/', tenantController.createTenant); // Criar um novo inquilino
router.get('/', tenantController.getAllTenants); // Listar todos os inquilinos
router.get('/:id', tenantController.getTenantById); // Obter inquilino pelo ID
router.put('/:id', tenantController.updateTenant); // Atualizar inquilino
router.delete('/:id', tenantController.deleteTenant); // Excluir inquilino

module.exports = router;
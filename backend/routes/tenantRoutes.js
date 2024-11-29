const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenantController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importa o middleware de autenticação

// Definir as rotas para inquilinos, todas protegidas por autenticação
router.post('/', authMiddleware, tenantController.createTenant); // Criar um novo inquilino
router.get('/', authMiddleware, tenantController.getAllTenants); // Listar todos os inquilinos
router.get('/:id', authMiddleware, tenantController.getTenantById); // Obter inquilino pelo ID
router.put('/', authMiddleware, tenantController.updateTenant); // Atualizar inquilino (agora por CPF)
router.delete('/:id', authMiddleware, tenantController.deleteTenant); // Excluir inquilino

module.exports = router;

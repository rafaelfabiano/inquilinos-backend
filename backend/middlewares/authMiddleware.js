const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Pega o token do cabeçalho Authorization (espera-se que seja algo como "Bearer <token>")
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verifica o token JWT com a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Adiciona as informações decodificadas (usuário) ao objeto da requisição
    req.user = decoded; // Incluindo o ID e o e-mail do usuário no request

    next(); // Chama o próximo middleware ou a função do controlador
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: 'Token inválido ou expirado.' });
  }
};

module.exports = authMiddleware;

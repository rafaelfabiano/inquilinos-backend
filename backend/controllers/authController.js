const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Importa o modelo de usuário

// Autenticar o usuário
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado.' });
    }

    // Verifica se a senha está correta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Credenciais inválidas.' });
    }

    // Cria o token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expira em 1 hora
    );

    res.status(200).json({ msg: 'Login bem-sucedido!', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro no servidor. Tente novamente.' });
  }
};

module.exports = { login };

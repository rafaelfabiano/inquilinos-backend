const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Criar um novo usuário
const createUser = async (req, res) => {
  console.log("Requisição recebida para criar usuário:", req.body); // Adicionando log
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Todos os campos são obrigatórios' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Usuário já cadastrado com este e-mail' });
    }

    const newUser = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10) 
    });

    await newUser.save();
    res.status(201).json({ msg: 'Usuário criado com sucesso', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao criar usuário' });
  }
};

module.exports = {
  createUser
};

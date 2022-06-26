import User from '../models/user.js';

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({ error: false, allUsers });
  } catch (error) {
    res.status(404).json({ error: true, message: error.message });
  }
};

export const getUserByID = async (req, res) => {
  const { id } = req.params;

  if (req.query.loggedIn === 'true') {
    try {
      const user = await User.findById(id);

      res.status(200).json({ error: false, user });
    } catch (error) {
      res.status(404).json({ error: true, message: error.message });
    }
  }

  if (req.query.loggedIn === 'false') {
    res.status(200).json({ error: true, loggedIn: false });
  }
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const user = await User.findById(id);
    user.email = email;

    await user.save();

    res.status(200).json({ error: false, user });
  } catch (error) {
    res.status(404).json({ error: true, message: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndRemove(id);

    res.status(200).json({ error: false, user });
  } catch (error) {
    res.status(404).json({ error: true, message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { email, password, admin } = req.body;

  const user = new User({ email, password });
  try {
    await user.save();

    res.status(201).json({ error: false, user });
  } catch (error) {
    res.status(409).json({ error: true, message: error.message });
  }
};

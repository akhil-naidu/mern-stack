import express from 'express';

import {
  deleteUserById,
  updateUserById,
  getUserByID,
  getAllUsers,
  createUser,
} from '../controllers/user.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserByID);
router.patch('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;

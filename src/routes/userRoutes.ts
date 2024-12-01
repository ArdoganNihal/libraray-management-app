// src/routes/userRoutes.ts
import express from 'express';
import { validate } from '../middleware/validation';
import { userSchema, returnBookSchema } from '../validations/schemas';
import { UserService } from '../services/userService';

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await UserService.listUsers();
    res.json(users);
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await UserService.getUserDetails(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    handleError(err, res);
  }
});

router.post('/users', validate(userSchema), async (req, res) => {
  try {
    await UserService.createUser(req.body);
    res.status(201).send();
  } catch (err) {
    handleError(err, res);
  }
});

router.post('/users/:userId/borrow/:bookId', async (req, res) => {
  try {
    await UserService.borrowBook(req.params.userId, req.params.bookId);
    res.status(204).send();
  } catch (err) {
    handleError(err, res);
  }
});

router.post('/users/:userId/return/:bookId',
  validate(returnBookSchema),
  async (req, res) => {
    try {
      await UserService.returnBook(
        req.params.userId,
        req.params.bookId,
        req.body.score
      );
      res.status(204).send();
    } catch (err) {
      handleError(err, res);
    }
  }
);

// Merkezi hata yönetimi
function handleError(err: any, res: express.Response) {
  console.error('Error:', err);

  if (err instanceof Error) {
    if (err.message.includes('not found')) {
      return res.status(404).json({ error: err.message });
    }
    if (err.message.includes('already borrowed')) {
      return res.status(400).json({ error: err.message });
    }
    if ('name' in err && err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation error',
        details: (err as any).errors.map((e: any) => e.message)
      });
    }
    return res.status(500).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Internal server error' });
}

export default router;

import express from 'express';
import { validate } from '../middleware/validation';
import { bookSchema } from '../validations/schemas';
import { Book } from '../models';

const router = express.Router();

router.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/books/:id', async (req, res) => {
  try {

    const bookId = parseInt(req.params.id);

    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({
      id: book.id,
      name: book.name,
      score: book.score === -1 ? -1 : parseFloat(book.score.toFixed(2))
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/books', validate(bookSchema), async (req, res) => {
  try {
    await Book.create({...req.body, score: -1});
    res.status(201).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

import { User, Book, Loan } from '../models';
import { Op } from 'sequelize';


export class UserService {
  static async listUsers() {
    return User.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']]
    });
  }

  static async createUser(userData: { name: string }) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      if (error instanceof Error && error.name === 'SequelizeValidationError') {
        throw error;
      }
      throw new Error('User creation failed');
    }
  }
  static async getUserDetails(userId: string) {
    const user = await User.findByPk(userId, {
      include: [{
        model: Loan,
        as: 'Loans',
        include: [{
          model: Book,
          as: 'Book',
          attributes: ['name']
        }]
      }]
    });

    if (!user) return null;

    const loans = user.Loans || [];
    return {
      id: user.id,
      name: user.name,
      books: {
        past: loans
          .filter(loan => loan.status === 'returned')
          .map(loan => ({
            name: loan.Book?.name,
            userScore: loan.score
          })),
        present: loans
          .filter(loan => loan.status === 'active')
          .map(loan => ({
            name: loan.Book?.name
          }))
      }
    };
  }

  static async borrowBook(userId: string, bookId: string) {
    const [user, book] = await Promise.all([
      User.findByPk(userId),
      Book.findByPk(bookId)
    ]);

    if (!user || !book) {
      throw new Error('User or Book not found');
    }

    const existingLoan = await Loan.findOne({
      where: {
        bookId: book.id,
        status: 'active'
      }
    });

    if (existingLoan) {
      throw new Error('Book is already borrowed');
    }

    return Loan.create({
      userId: user.id,
      bookId: book.id,
      status: 'active',
      borrowDate: new Date()
    });
  }

  static async returnBook(userId: string, bookId: string, score: number) {
    const loan = await Loan.findOne({
      where: {
        userId,
        bookId,
        status: 'active'
      }
    });

    if (!loan) {
      throw new Error('Active loan not found');
    }

    await loan.update({
      status: 'returned',
      returnDate: new Date(),
      score
    });

    await this.updateBookScore(bookId);
  }

  private static async updateBookScore(bookId: string) {
    const allScores = await Loan.findAll({
      where: {
        bookId,
        score: { [Op.ne]: null } as any
      },
      attributes: ['score']
    });

    const scores = allScores
      .map(loan => loan.score)
      .filter(score => score !== null);

    const averageScore = scores.length > 0
      ? scores.reduce((acc, curr) => acc + (curr || 0), 0) / scores.length
      : 0;

    await Book.update(
      { score: parseFloat(averageScore.toFixed(2)) },
      { where: { id: bookId } }
    );
  }
}

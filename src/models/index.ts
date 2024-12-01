import User from './User';
import Book from './Book';
import Loan from './Loan';
import sequelize from '../config/database';

User.hasMany(Loan, {
  foreignKey: 'userId',
  as: 'Loans'
});

Loan.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User'
});

Book.hasMany(Loan, {
  foreignKey: 'bookId',
  as: 'Loans'
});

Loan.belongsTo(Book, {
  foreignKey: 'bookId',
  as: 'Book'
});

export {
  sequelize,
  User,
  Book,
  Loan
};

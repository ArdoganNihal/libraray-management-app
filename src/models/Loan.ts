import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { ILoan } from './interfaces';

class Loan extends Model<ILoan> implements ILoan {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public borrowDate!: Date;
  public returnDate!: Date;
  public score!: number;
  public status!: 'active' | 'returned';
  public Book?: any; // ilişki için
  public User?: any; // ilişki için
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Loan.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'books',
      key: 'id'
    }
  },
  borrowDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'returned'),
    defaultValue: 'active'
  }
}, {
  sequelize,
  tableName: 'loans'
});

export default Loan;

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { IBook } from './interfaces';


class Book extends Model<IBook> implements IBook {
  public id!: number;
  public name!: string;
  public score!: number;
  public Loans?: any[]
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.FLOAT,
    defaultValue: -1
  }
}, {
  sequelize,
  tableName: 'books',
  indexes: [
    {
      unique: false,
      fields: ['name']
    }
  ]
});

export default Book;

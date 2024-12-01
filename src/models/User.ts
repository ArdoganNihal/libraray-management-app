import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { IUser } from './interfaces';

class User extends Model<IUser> implements IUser {
  public id!: number;
  public name!: string;

  public Loans?: any[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'users'
});

export default User;

import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes} from 'sequelize';
import {db} from '../index';

// order of InferAttributes & InferCreationAttributes is important.
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  public declare id: CreationOptional<number>;
  // other attributes...
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    tableName: 'users',
    sequelize: db.sequelize, // passing the `sequelize` instance is required
  },
);

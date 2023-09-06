import jwt from 'jsonwebtoken'
import { Model, DataTypes } from 'sequelize'
import { REFRESH_TOKEN_SECRET, sequelize } from '../config'
import Token from './Token'

class User extends Model {
  public id!: string
  public firstName!: string
  public LastName!: string
  public email!: string
  public mobileNumber!: string
  public password!: string
  public isEmailVerified!: boolean
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'users',
    sequelize,
  },
)

export default User

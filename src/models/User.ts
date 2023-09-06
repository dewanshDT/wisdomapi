import crypto from 'crypto'
import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config'

class User extends Model {
  public id!: string
  public firstName!: string
  public lastName!: string
  public email!: string
  public mobileNumber!: string
  public password!: string
  public isEmailVerified!: boolean
  public emailVerificationToken!: string

  getEmailVerificationToken() {
    const unHashedToken = crypto.randomBytes(16).toString('hex')
    const hashedToken = crypto
      .createHash('sha256')
      .update(unHashedToken)
      .digest('hex')

    this.emailVerificationToken = hashedToken
    return unHashedToken
  }

  checkEmailVerificationToken(token: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    if (this.emailVerificationToken === hashedToken) {
      this.isEmailVerified = true
      return true
    } else return false
  }
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
    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: 'users',
    sequelize,
  },
)

export default User

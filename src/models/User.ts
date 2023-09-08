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

  getUser() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: this.mobileNumber,
      isEmailVerified: this.isEmailVerified,
    }
  }

  getEmailVerificationToken() {
    const unHashedToken = crypto.randomBytes(16).toString('hex')
    console.log('*****************', unHashedToken)
    const hashedToken = crypto
      .createHash('sha256')
      .update(unHashedToken)
      .digest('hex')

    this.emailVerificationToken = hashedToken
    this.save()
    return unHashedToken
  }

  checkEmailVerificationToken(token: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    if (this.emailVerificationToken === hashedToken) {
      this.isEmailVerified = true
      this.save()
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
      unique: true,
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

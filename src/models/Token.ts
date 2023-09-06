import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config'

class Token extends Model {
  public id!: string
  public userId!: string
  public token!: string
}

Token.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      onUpdate: 'cascade',
      onDelete: 'cascade',
      references: { model: 'users', key: 'id' },
    },

    token: {
      type: DataTypes.TEXT,
    },
  },
  { tableName: 'tokens', timestamps: true, sequelize },
)
export default Token

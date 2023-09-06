import { Sequelize } from 'sequelize'
import { DB_NAME, DB_USER_NAME, DB_USER_PASSWORD } from '.'

export const sequelize = new Sequelize(
  `postgres://${DB_USER_NAME}:${DB_USER_PASSWORD}@localhost:5432/${DB_NAME}`,
)

sequelize.sync({ force: true }).then(() => {
  console.log('db has been re sync')
})

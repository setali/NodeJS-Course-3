import { Sequelize, Model } from 'sequelize'

export * from 'sequelize'

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: process.env.DATABASE_PORT,
    logging: process.env.NODE_ENV === 'development' ? logQuery : false
  }
)

function logQuery (query) {
  console.log(`Database query: ${query}`)
}

export class BaseModel extends Model {
  static find (id, options) {
    return this.findByPk(id, options)
  }

  remove () {
    return this.destroy()
  }
}

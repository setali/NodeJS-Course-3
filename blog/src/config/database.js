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
  static DEFAULT_PAGE_SIZE = 2

  static find (id, options) {
    return this.findByPk(id, options)
  }

  remove () {
    return this.destroy()
  }

  static async findPaginate (page = 1, options = {}) {
    page = +page

    const {
      limit = this.DEFAULT_PAGE_SIZE,
      offset = (page - 1) * limit,
      ...otherOptions
    } = options

    const { count: total, rows: items } = await this.findAndCountAll({
      limit,
      offset,
      order: [['id', 'DESC']],
      ...otherOptions
    })

    const pages = Math.ceil(total / limit)

    return {
      items,
      total,
      page,
      pages,
      limit,
      offset,
      hasPervPage: page > 1,
      hasNextPage: page < pages,
      pervPage: page - 1 || null,
      nextPage: page < pages ? page + 1 : null
    }
  }
}

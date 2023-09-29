import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'blog',
  password: '123456',
  port: 3303
})

class BaseModel {
  constructor ({ id, ...params }) {
    this.id = id

    this.fieldNames.forEach(field => {
      this[field] = params[field]
    })
  }

  get fields () {
    return this.constructor.fields
  }

  get fieldNames () {
    return this.fields.map(f => f.name)
  }

  get entityName () {
    return this.constructor.entityName
  }

  save () {
    const q = this.id
      ? `UPDATE ${this.entityName} SET ${this.fieldNames
          .map(
            name =>
              `${name} = ${
                this[name] === undefined ? 'NULL' : `'${this[name]}'`
              }`
          )
          .join(',')} WHERE id = ${this.id}`
      : `INSERT INTO ${this.entityName} (${this.fieldNames.join(',')})
      VALUES (${this.fieldNames
        .map(name => (this[name] === undefined ? 'NULL' : `'${this[name]}'`))
        .join(',')})
    `

    return query(q)
  }

  static findAll () {
    return query(`SELECT * from ${this.entityName}`)
  }

  static async find (id) {
    const [data] = await query(
      `SELECT * from ${this.entityName} WHERE id = ${id}`
    )

    return data ? new this(data) : undefined
  }

  static remove (id) {
    return query(`DELETE FROM ${this.entityName} WHERE id = ${id}`)
  }

  remove () {
    return this.constructor.remove(this.id)
  }
}

export default BaseModel

export function create (Entity) {
  query(`SHOW TABLES LIKE '${Entity.entityName}'`).then(result => {
    if (result.length === 0) {
      query(`CREATE TABLE IF NOT EXISTS ${Entity.entityName}
        (id INT NOT NULL AUTO_INCREMENT,
          ${Entity.fields
            .map(
              field =>
                `${field.name} ${field.type} ${
                  field.nullable ? '' : 'NOT NULL'
                }`
            )
            .join(',')} ,
          PRIMARY KEY (id)
        );
      `).then(() => console.log(`${Entity.entityName} table created.`))
    }
  })

  return Entity
}

function query (q) {
  return new Promise((resolve, reject) => {
    connection.query(q, function (err, results, fields) {
      if (err) {
        return reject(err)
      }

      resolve(results)
    })
  })
}

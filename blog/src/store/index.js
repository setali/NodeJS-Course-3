import fs from 'fs'
import path from 'path'

class BaseModel {
  constructor ({ id, ...params }) {
    this.id = id

    this.fields.forEach(field => {
      this[field] = params[field]
    })
  }

  get fields () {
    return this.constructor.fields
  }

  get entityName () {
    return this.constructor.entityName
  }

  save () {
    const data = this.data

    if (this.id) {
      const entity = data.find(a => a.id === this.id)
      this.fields.forEach(fieldName => {
        entity[fieldName] = this[fieldName]
      })
    } else {
      const entity = {
        id: this.generateId()
      }

      this.fields.forEach(fieldName => {
        entity[fieldName] = this[fieldName]
      })

      data.push(entity)
    }

    saveData(this.entityName, data)
  }

  generateId () {
    return Date.now()
  }

  static get data () {
    return getData(this.entityName)
  }

  get data () {
    return getData(this.entityName)
  }

  static findAll () {
    return this.data
  }

  static find (id) {
    const data = this.data.find(a => a.id === id)

    return data ? new this(data) : undefined
  }

  static remove (id) {
    const data = getData()

    const index = data.findIndex(a => a.id === id)

    if (index >= 0) {
      data.splice(index, 1)
      saveData(this.entityName, data)
    }
  }

  remove () {
    this.constructor.remove(this.id)
  }
}

export default BaseModel

export function create (Entity) {
  const filePath = getFilePath(Entity.entityName)

  if (!fs.existsSync(filePath)) {
    saveData(Entity.entityName, [])
  }

  return Entity
}

function getFilePath (entityName) {
  return path.resolve(__dirname, `${entityName}.data`)
}

function getData (entityName) {
  const filePath = getFilePath(entityName)

  const data = fs.readFileSync(filePath)

  return JSON.parse(data)
}

function saveData (entityName, data) {
  const filePath = getFilePath(entityName)

  fs.writeFileSync(filePath, JSON.stringify(data))
}

const store = {}

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
    if (this.id) {
      const entity = this.data.find(a => a.id === this.id)
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

      store[this.entityName].push(entity)
    }
  }

  generateId () {
    return Date.now()
  }

  static get data () {
    return store[this.entityName]
  }

  get data () {
    return store[this.entityName]
  }

  static findAll () {
    return this.data
  }

  static find (id) {
    const data = this.data.find(a => a.id === id)

    return data ? new this(data) : undefined
  }

  static remove (id) {
    const index = this.data.findIndex(a => a.id === id)

    if (index >= 0) {
      this.data.splice(index, 1)
    }
  }

  remove () {
    this.constructor.remove(this.id)
  }
}

export default BaseModel

export function create (Entity) {
  if (!store[Entity.entityName]) {
    store[Entity.entityName] = []
  }

  return Entity
}

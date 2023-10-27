import winston from 'winston'
import 'winston-mongodb'

console.log(process.env.MONGO_URI)
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    new winston.transports.MongoDB({
      db: process.env.MONGO_URI,
      collection: 'log'
    })
  ]
})

export function log (options) {
  if (options.metadata?.user?.dataValues) {
    options.metadata.user = options.metadata.user.toJSON()
  }

  logger.log({ level: 'info', ...options })
}

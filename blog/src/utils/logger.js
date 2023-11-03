import winston from 'winston'
import 'winston-mongodb'

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
  if (typeof options.metadata?.user?.toJSON === 'function') {
    options.metadata.user = options.metadata.user.toJSON()
  }

  logger.log({ level: 'info', ...options })
}

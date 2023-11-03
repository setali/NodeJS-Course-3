import winston from 'winston'
import 'winston-mongodb'

export const mongoTransporter = new winston.transports.MongoDB({
  db: process.env.MONGO_URI,
  collection: 'log'
})

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    mongoTransporter
  ]
})

export function log (options) {
  if (typeof options.metadata?.user?.toJSON === 'function') {
    options.metadata.user = options.metadata.user.toJSON()
  }

  logger.log({ level: 'info', ...options })
}

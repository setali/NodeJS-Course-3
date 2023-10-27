import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    new winston.transports.File({ filename: 'all.log' })
  ]
})

export function log (options) {
  logger.log({ level: 'info', ...options })
}

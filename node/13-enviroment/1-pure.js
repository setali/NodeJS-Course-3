require('./loadEnv').config('.ali')

console.log(process.env.DATABASE_HOST)
console.log(process.env.NODE_ENV)

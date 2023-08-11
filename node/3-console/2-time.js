console.time('my-label')
const t1 = Date.now()

999n ** 999999n

const t2 = Date.now()
console.timeEnd('my-label')

console.log(t2 - t1)

function f1 () {
  console.log('salam')
  console.trace()
}

function f2 () {
  f1()
}

function f3 () {
  f2()
}

f3()

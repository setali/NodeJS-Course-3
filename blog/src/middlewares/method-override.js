export default (req, res, next) => {
  if (req.method === 'POST' && req.body._method) {
    req.method = req.body._method
    delete req.body._method
  }

  next()
}

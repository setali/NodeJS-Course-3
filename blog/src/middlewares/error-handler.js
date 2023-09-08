export default (err, req, res, next) => {
  console.log(err.message)
  console.log(err)
  res.status(400).send(err.message)
}

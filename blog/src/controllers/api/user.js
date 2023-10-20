class UserController {
  async user (req, res) {
    res.status(req.user ? 200 : 404).json(req.user)
  }
}

export default new UserController()

import { Op } from 'sequelize'
import Message from '../../models/message'

class MessageController {
  async list (req, res) {
    const { user } = req
    const { selectedUser, messageId } = req.query

    const ids = [user.id, selectedUser]

    const query = {
      where: {
        from: { [Op.in]: ids },
        to: { [Op.in]: ids }
      },
      limit: 10,
      order: [['id', 'DESC']]
    }

    if (messageId) {
      query.where.id = { [Op.lt]: messageId }
    }

    const messages = await Message.findAll(query)

    res.json(messages)
  }
}

export default new MessageController()

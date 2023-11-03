import Message from './models/message'

const map = new Map()

export default (io, socket) => {
  console.log('connected', socket.id)

  const { user } = socket.request

  console.log('user connected', user.username)

  socket.emit('user-connected', user)

  saveId()

  socket.on('message', async data => {
    const message = new Message(data)
    await message.save()

    socket.emit('message', message)

    const reciever = getSocketId(data.to)
    socket.to(reciever).emit('message', message)
  })

  function saveId () {
    map.set(user.id, socket.id)
  }

  function getSocketId (userId) {
    return map.get(userId)
  }

  function removeId () {
    return map.delete(user.id)
  }

  socket.on('disconnect', () => {
    console.log(`User ${user.username} disconnected`)
    removeId()
  })
}

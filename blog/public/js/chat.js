const socket = io()
const users = document.getElementById('users')
const messageListWrapper = document.getElementById('message-list-wrapper')
const form = document.getElementById('chat-form')
const input = document.getElementById('chat-input')

let selectedUser, user

socket.on('user-connected', data => {
  user = data
})

socket.on('message', data => {
  printMessage(data)
})

form.addEventListener('submit', event => {
  event.preventDefault()

  if (!input.value) return

  if (!selectedUser) {
    alert('Please select a user')
  }

  socket.emit('message', {
    message: input.value,
    to: selectedUser.id,
    from: user.id
  })

  input.value = ''
  input.focus()
})

function getPerson () {
  return fetch('/api/person').then(res => res.json())
}

getPerson().then(people => people.forEach(person => createUserChat(person)))

function createUserChat (person) {
  const userWrapper = document.createElement('div')
  userWrapper.textContent = person.username
  userWrapper.addEventListener('click', event => {
    selectedUser = person

    document.querySelector('#users > .active')?.classList.remove('active')
    document.querySelector('.message-list.active')?.classList.remove('active')

    event.target.classList.add('active')
    const messages = document.getElementById(`messages-${person.id}`)
    messages.classList.add('active')

    loadMessages(messages)
  })

  users.appendChild(userWrapper)

  const messageWrapper = document.createElement('div')
  messageWrapper.setAttribute('id', `messages-${person.id}`)
  messageWrapper.classList.add('message-list')

  messageWrapper.addEventListener('scroll', event => {
    const element = event.target
    if (element.scrollTop === 0) {
      loadMessagesByScroll(element)
    }
  })

  messageListWrapper.appendChild(messageWrapper)
}

function printMessage (data, type = 'append', scrollElement) {
  const message = document.createElement('div')
  message.classList.add('message')
  message.setAttribute('message-id', data.id)

  const text = document.createElement('div')
  text.textContent = data.message

  const time = document.createElement('div')
  time.textContent = data.createdAt
  time.classList.add('time')

  message.appendChild(text)
  message.appendChild(time)

  if (data.from === user.id) {
    message.classList.add('owner')
  }

  const elementId = user.id === data.from ? data.to : data.from

  const messages = document.getElementById(`messages-${elementId}`)

  if (type === 'append') {
    messages.appendChild(message)
  } else {
    messages.prepend(message)
  }

  if (scrollElement) {
    scrollElement.scrollIntoView()
  } else {
    message.scrollIntoView()
  }
}

function loadMessages (messageWrapper) {
  getMessages().then(messages => {
    console.log(messages)
    messages.forEach(message =>
      printMessage(message, 'prepend', messageWrapper.lastChild)
    )
  })
}

function loadMessagesByScroll (messageWrapper) {
  const { firstChild } = messageWrapper
  const messageId = firstChild.getAttribute('message-id')

  getMessages({ messageId }).then(messages => {
    console.log(messages)
    messages.forEach(message => printMessage(message, 'prepend', firstChild))
  })
}

function getMessages (options) {
  const url = `/api/message?${new URLSearchParams({
    selectedUser: selectedUser.id,
    ...options
  })}`

  return fetch(url).then(res => res.json())
}

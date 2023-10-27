export const loginSchema = {
  body: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 255
      },
      password: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 255
      }
    }
  }
}

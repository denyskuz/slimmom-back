const responses = {
  userRegister: {
    type: 'object',
    properties: {
      status: { type: 'string', example: 'success' },
      data: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Registration successful' },
          user: {
            type: 'object',
            properties: {
              email: { type: 'string', example: 'nic@gmail.com' },
              name: { type: 'string', example: 'Nic' },
            },
          },
        },
      },
    },
  },
  userLogin: {
    type: 'object',
    properties: {
      status: { type: 'string', example: 'success' },
      data: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTI2NDhkYmYwOWUwNzA3NTVkODliZSIsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJpYXQiOjE2NzE1ODgxNDksImV4cCI6MTY3MTU5MTc0OX0.jJSyyA21txMSU4mw-TEPK1afpF2v9--jICFNDnuLwKM',
          },
          user: {
            type: 'object',
            properties: {
              email: { type: 'string', example: 'nic@gmail.com' },
              name: { type: 'string', example: 'Nic' },
              age: { type: 'number', example: '18' },
              height: { type: 'number', example: '150' },
              currentWeight: { type: 'number', example: '60' },
              desiredWeight: { type: 'number', example: '50' },
              bloodType: { type: 'number', example: '1' },
            },
          },
        },
      },
    },
  },
};

module.exports = responses;

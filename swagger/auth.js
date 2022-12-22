router.post('api/auth/registration', () => {
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Eнд-поінт реєстрації'
  /* #swagger.responses[201] = {
        description:'Success response',
        content: {
          "application/json": {
              schema: { $ref: '#/components/responses/userRegister' }
  }}} */
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[409] = { description: 'Conflict, email in use' }
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
            schema: { $ref: '#/components/requestBodies/registrationParams' },
        }}}
  */
});

router.post('api/auth/login', () => {
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Eнд-поінт аутентифікації'
  /* #swagger.responses[200] = {
        description:'Success response',
        content: {
          "application/json": {
              schema: { $ref: '#/components/responses/userLogin' }
  }}} */
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Incorrect login or password' }
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
            schema: { $ref: '#/components/requestBodies/loginParams' },
        }}}
  */
});

router.get('api/auth/logout', () => {
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Енд-поінт виходу з облікового запису'
  // #swagger.responses[204] = { description: 'Success response' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }
});

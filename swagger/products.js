router.post('api/products/', () => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'Публічний енд-поінт на отримання денної норми ккал та списку нерекомендованих продуктів'
  /* #swagger.responses[200] = {
        description:'Success response',
        content: {
          "application/json": {
              schema: { $ref: '#/components/responses/badProductsFind' }
  }}} */
  // #swagger.responses[400] = { description: 'Bad request' }
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
            schema: { $ref: '#/components/requestBodies/userParams' },
        }}}
  */
});

router.patch('api/products/', () => {
  // #swagger.tags = ['Products']
  /* #swagger.description = 'Приватний енд-поінт на отримання денної норми ккал та списку нерекомендованих 
  продуктів, записує надану/отриману інформацію у БД' */
  /* #swagger.responses[200] = {
        description:'Success response',
        content: {
          "application/json": {
              schema: { $ref: '#/components/responses/badProductsFind' }
  }}} */
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
            schema: { $ref: '#/components/requestBodies/userParams' },
        }}}
  */

});

router.get('api/products/', () => {
  // #swagger.tags = ['Products']
  // #swagger.description = 'енд-поінт на пошук продуктів з БД по query-рядку'
  /* #swagger.responses[200] = {
        description:'Success response',
        content: {
          "application/json": {
              schema: { $ref: '#/components/responses/badProductsFind' }
  }}} */
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }

});

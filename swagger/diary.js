router.post('/api/diary/', () => {
  // #swagger.tags = ['Diary']
  // #swagger.description = 'Eнд-поінт на додавання з`їденого продукту у конкретний день'
  /* #swagger.responses[201] = {
        description:'Success response',
        content: {
          "application/json": {
              schema: { $ref: '#/components/responses/noteCreated' }
  }}} */
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
            schema: { $ref: '#/components/requestBodies/noteParams' },
        }}}
  */
});

router.get('/api/diary/:date', () => {
  // #swagger.tags = ['Diary']
  // #swagger.description = 'Eнд-поінт на отримання всієї інформації щодо конкретного дня'
  /* #swagger.responses[200] = {
        description:'Success response',
        content: {
          "application/json": {
              schema: { $ref: '#/components/responses/notesFind' }
  }}} */
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }
  // #swagger.parameters['date'] = { example: '2022-21-12', }
});

router.delete('/api/diary/:noteId', () => {
  // #swagger.tags = ['Diary']
  // #swagger.description = 'Eнд-поінт для видалення з`їденого продукту в конкретний день'
  /* #swagger.responses[200] = {
        description:'Success response',
        content: {
          "application/json": {
              schema: { $ref: '#/components/responses/noteDeleted' }
  }}} */
  // #swagger.responses[400] = { description: 'Bad request' }
  // #swagger.responses[401] = { description: 'Missing header with authorization token' }
});

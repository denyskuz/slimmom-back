const handleErrors = app => {
  app.use('/', (_, res) => {
    return res.status(404).json({ message: 'Not Found' });
  });

  app.use((err, req, res, _) => {
    console.error(`err ====>: ${req.type}, ${err.message}, ${err.name}`);

    if (err.status) {
      return res.status(err.status).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      message: 'Internal server error',
    });
  });
};

module.exports = handleErrors;

module.exports = function(app, db) {
  app.post('/events', (req, res) => {
    console.log(req.body)
    res.send('Hello')
  });
};

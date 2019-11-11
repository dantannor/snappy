const express = require('express');
const handler = require('./handler');
const app = express();
const port = 3000;

app.get('/:keyword', (req, res) => {
  try {
    // console.log(`received request: ${JSON.stringify(req, null, 4)}`);

    var keyword = req.params.keyword;
    var vendor = req.query.vendor;

    handler.search(keyword, vendor, res);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Snappy app listening on port ${port}!`));

module.exports = app;

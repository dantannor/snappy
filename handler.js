var mongoose = require('mongoose');
const { Products } = require('./models/product');

const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 * 5 });

mongoose.connect(
  'mongodb://localhost:27017/snappy',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      console.log(err);
    }
  }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
});

const search = (keyword, vendor, res) => {
  const key = `key: ${keyword} vendor: ${vendor}`;

  let generalRes = cache.get(key);
  if (generalRes) return res.send(generalRes);

  Products.findOne()
    .lean()
    .exec(function(err, products) {
      if (err) {
        console.log(err);
        return;
      }

      const searchRes = products.products.filter(product => {
        const containsKey = product.name.includes(keyword);
        if (vendor) {
          return containsKey && product.vendor === vendor;
        }
        return containsKey;
      });

      generalRes = {
        products: searchRes,
        promotion: products.promotion
      };

      cache.set(key, generalRes);

      res.send(generalRes);
    });
};

module.exports = {
  search
};

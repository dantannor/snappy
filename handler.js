var mongoose = require('mongoose');
const { Products } = require('./models/product');
const NodeCache = require('node-cache');
const config = require('config');

const connection = config.get('connection');
const cache = new NodeCache({ stdTTL: 60 * 5 });

const topQueries = new Map();
const topVendors = new Map();

mongoose.connect(
  connection,
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

  updateTopData(key, vendor);

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

const updateTopData = (key, vendor) => {
  if (topQueries.has(key)) {
    let count = topQueries.get(key);
    topQueries.set(key, count + 1);
  } else {
    topQueries.set(key, 1);
  }

  if (topVendors.has(vendor)) {
    let count = topQueries.get(vendor);
    topVendors.set(vendor, count + 1);
  } else {
    topVendors.set(vendor, 1);
  }
};

module.exports = {
  search
};

module.exports.topQueries = topQueries;
module.exports.topVendors = topVendors;

var mongoose = require('mongoose');
const { Products } = require('./models/product');
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
  Products.findOne({}, function(err, products) {
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

    const generalRes = {
      products: searchRes,
      promotion: products.promotion
    };

    // console.log(`found products: ${JSON.stringify(res, null, 4)}`);

    res.send(generalRes);
  });
};

module.exports = {
  search
};

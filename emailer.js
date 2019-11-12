var nodemailer = require('nodemailer');
const config = require('config');

const user = config.get('user');
const pass = config.get('pass');
const to = config.get('to');

const send = (topQueries, topVendors) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass
    }
  });

  var mailOptions = {
    from: user,
    to,
    subject: 'Hello from Snappy',
    text: `top queries: ${topQueries}, top vendors: ${topVendors}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = {
  send
};

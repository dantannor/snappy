/* eslint-disable prefer-arrow-callback */

const request = require('supertest');
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-shallow-deep-equal'));
const app = require('../app');

const expected = {
  products: [
    {
      id: 1,
      name: 'Echo Dot (2nd Generation) - Black',
      order: 1,
      vendor: 'amazon'
    },
    {
      id: 3,
      name: 'Echo Dot (4nd Generation) - White',
      order: 3,
      vendor: 'amazon'
    },
    {
      id: 4,
      name: 'Echo Dot (5nd Generation) - Pink',
      order: 5,
      vendor: 'amazon'
    },
    {
      id: 7,
      name: 'Echo Dot (10nd Generation) - Blue',
      order: 7,
      vendor: 'amazon'
    },
    {
      id: 10,
      name: 'Echo Dot (11nd Generation) - Black',
      order: 10,
      vendor: 'amazon'
    }
  ],
  promotion: {
    hide: false,
    order: 3,
    text: 'buy today and get 10% off'
  }
};

describe('basic app functionality', function() {
  it('should receive Echo search results with amazon vendor', function(done) {
    request(app)
      .get('/Echo?vendor=amazon')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      // eslint-disable-next-line no-loop-func
      .then(response => {
        expect(response.body).to.shallowDeepEqual(expected);

        done();
      });
  });
});

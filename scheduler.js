import schedule from 'node-schedule';
const { topQueries, topVendors } = require('./handler');
const emailer = require('./emailer');

schedule.scheduleJob('0 0 * * *', () => {
  const sortedQueries = new Map(
    [...topQueries.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)
  );
  const sortedVendors = new Map(
    [...topVendors.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)
  );

  emailer.send(sortedQueries, sortedVendors);
}); // run everyday at midnight

# snappy

usage:

- configure mongo connection string in config/default.json
- GET /$searchTerm?vendor=$vendor in order to search
- currently only supports gmail. to send an email please configure the appropriate fields in the config/default.json file

decisions:

- db access:
  the json i received was in an array format, so i decided to simply pull the whole array from the db and filter it later, rather than creating a more complex query. this is not ideal nor scalable - ideally the data should be stored in separate docs.

improvements:

- scheduler not tested and working yet
- would separate mongo code into a repo file rather than be part of the handler
- as stated, would save data to separate mongo docs
- would add more tests

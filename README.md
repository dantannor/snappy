# snappy

- db access:
  the json i received was in an array format, so i decided to simply pull the whole array from the db and filter it later, rather than creating a more complex query. this is not ideal nor scalable - ideally the data should be stored in separate docs.

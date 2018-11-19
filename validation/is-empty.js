const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

module.exports = isEmpty;
/*
  This method will check a value to see if its contents are equal to one of the following (The "validator" method only checks for an empty string):
    - undefined
    - null
    - Data type of 'Object'
    - Data type of 'String'
*/

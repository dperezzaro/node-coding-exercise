const debug = require('debug')('removeDuplicates');
const config = require('../config');

/**
 * Recursively removes duplicate objects from array properties
 * @param {Object} obj - Object to check
 * @param {Array<Object>} props - obj properties that should be checked
 * @param {Array<Object> props.name - obj property to parse
 * @param {String> props.filterBy - element property value that should be unique
 * @param {Array<Object> props.filterProps - extra element properties to check
 * @returns {Object} - Parsed object
 */
const remove = (obj, props) => {
  debug('remove: %d %j', Object.keys(obj).length, props);
  const parsedProps = {};

  // Check object properties
  props.forEach((prop) => {
    // NOTE: we are assuming
    // - obj[name] exists and is an array
    // - obj[name][*][filterBy] exists and is a scalar

    const { name, filterBy, filterProps } = prop;
    let parsedValue;

    // If filterBy is present attempt to remove duplicates
    if (filterBy) {
      const ids = {};
      parsedValue = [];

      obj[name].forEach((el, idx) => {
        if (ids[el[filterBy]] === undefined) {
          ids[el[filterBy]] = idx;
          parsedValue.push(el);
        }
      });

    // otherwise simply copy reference
    } else {
      parsedValue = obj[name];
    }

    // If filterProps exists process further each array element
    parsedProps[name] = filterProps
      ? parsedValue.map((el) => remove(el, filterProps))
      : parsedValue;
  });

  return {
    ...obj,
    ...parsedProps,
  };
};

/**
 * Remove application schema duplicates
 * @param {Object} schema - Application schema
 * @param {Array<Object> filter - Application schema fields to parse
 * @returns {Object} - Application schema without duplicates
 */
// eslint-disable-next-line
const removeDuplicates = (schema, filter = config.filter) => {
  // TODO validate schema / filter
  // I would use a JSON schema validator such as AJV:
  // - https://github.com/ajv-validator/ajv
  return remove(schema, filter);
};

module.exports = removeDuplicates;

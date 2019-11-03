// GET https://sheets.googleapis.com/v4/spreadsheets/18J84rwqwC9AuyabZAK9d4JM6cUZn8jBnhZoT0NHMTp8/values/Sheet1!A1:D5

const {camelCase} = require('change-case')
const flatMap = require('lodash.flatmap')

/*------------------------------------------------------------------------------
  Utility functions
------------------------------------------------------------------------------*/
const {toPairs, fromPairs, pipe} = require('./utils')

/*------------------------------------------------------------------------------
  objectFromMxGoogleDoc
------------------------------------------------------------------------------*/
function objectFromMxGoogleDoc({values}) {
  let section
  let expectColumnNames = false
  let columnNames
  return values.reduce((result, row) => {
    if (row.length === 0) {
      return result
    }

    if (row.length === 1) {
      section = camelCase(row[0])
      expectColumnNames = true
      return {
        ...result,
        [section]: []
      }
    }

    if (section === 'diagramProperties') {
      result[section].push({
        [camelCase(row[1])]: row[2]
      })
      return result
    }

    if (expectColumnNames) {
      expectColumnNames = false
      columnNames = row.filter(col => col.length)
      return result
    }

    result[section].push(
      keysAndValuesToObject(columnNames, row)
    )

    return result
  }, {})
}

const cleanupDiagramProperties = input => ({
  ...input,
  diagramProperties: fromPairs(flatMap(input.diagramProperties, toPairs))
})

function keysAndValuesToObject(keys, values) {
  return keys.reduce((result, key, index) => ({
    ...result,
    [camelCase(key)]: values[index]
  }), {})
}

function deepNumericValuesToIntegers(arg) {
  if (Array.isArray(arg)) {
    return arg.map(deepNumericValuesToIntegers)
  }

  if (typeof arg !== 'object') {
    return /^-?\d+$/.test(arg) ? parseInt(arg, 10) : arg
  }

  return Object
    .entries(arg)
    .reduce((result, [key, value]) => ({
      ...result,
      [key]: deepNumericValuesToIntegers(value)
    }), {})
}

const mxToObject = (doc, toJson = false) => {
  const fromJson = typeof doc === 'string'
    ? JSON.parse
    : x => x

  toJson = (typeof toJson === 'function' && toJson)
    || toJson
    ? arg => JSON.stringify(arg, null, 2)
    : x => x

  return pipe(
    fromJson,
    objectFromMxGoogleDoc,
    cleanupDiagramProperties,
    deepNumericValuesToIntegers,
    toJson
  )(doc)
}

module.exports = mxToObject

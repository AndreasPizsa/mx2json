import test from 'ava'
const {readFileSync} = require('fs')
const {join} = require('path')

const mx2object = require('../api')

test('convert a doc', t => {
  const input = JSON.parse(
    readFileSync(join(__dirname, './example.json'), 'utf-8')
  )
  const result = mx2object(input, true)
  t.truthy(result)
  console.log(result)

  const ajv = require('ajv')()
  const validate = ajv.compile(require('../json-schema.json'))
  validate(result)
})

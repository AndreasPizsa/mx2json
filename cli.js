#!/usr/bin/env node

const mxToObject = require('./api')
const {pipe} = require('./utils')

// eslint-disable-next-line no-unused-expressions
require('yargs')
  .scriptName('mx2json')
  .command(
    '$0',
    'Convert Machinations Google Doc file to JSON',
    {},
    async argv => {
      if (/^.*?:.*/.test(argv.file)) {
        console.error(`use\n   curl "${argv.file}" | ${argv.$0}\nto use URLs`)
        return
      }

      const input = argv.file
        ? await require('fs').promises.readFile(argv.file, 'utf8')
        : await require('get-stdin')()

      pipe(
        mxToObject,
        doc => JSON.stringify(doc, null, 2),
        console.log.bind(console)
      )(input)
    })
  .argv

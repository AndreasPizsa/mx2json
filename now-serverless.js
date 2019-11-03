const got = require('got')
const mx2json = require('./api')
module.exports = async (req, res) => {
  const docId = req.url.replace(/\?.*/, '').split('/').pop()
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${docId}/values/A%3AZ`
  try {
    const {body} = await got(url, {
      headers: {
        authorization: `Bearer ${req.query.token}` || req.headers.authorization
      }
    })
    res.json(mx2json(body))
  } catch (error) {
    res.json(JSON.parse(error.body))
  }
}

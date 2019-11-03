Object.assign(module.exports, {
  pipe: (...fns) => arg => fns.reduce(
    (result, fn) => fn(result), arg
  ),

  toPairs: Object.entries,

  fromPairs: pairs => pairs.reduce((result, [key, value]) => ({
    ...result,
    [key]: value
  }), {})
})

let lastID = Date.now()
module.exports = () => {
  lastID += 1
  return lastID
}

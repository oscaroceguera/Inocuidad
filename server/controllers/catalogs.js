var db = require('../db')

// GET /catalogs?id=uui-catalog
exports.getCatalogs = function (req, res) {
  var query = req.query
  var where = {
    status: true
  }

  if (query.hasOwnProperty('id')) {
    where.id = query.id
  }

  // if (query.hasOwnProperty('parent')) {
  //   where.parent_id = query.parent
  // }

  db.catalog.findAll({where: where}).then(function (catalogs) {
    res.json(catalogs)
  }, function (e) {
    res.status(400).json(e)
  })
}

var db = require('../db')
var _ = require('lodash')

exports.getModules = function (req, res) {
  db.module.findAll().then(function (modules) {
    var modulesOut = _.map(modules, function (module) {
      return {
        id: module.uuid,
        title: module.title,
        subtitle: module.subtitle,
        acronym: module.acronym,
        avatar: module.avatar,
        image: module.image,
        path: module.path,
        items: module.items
      }
    })
    res.json(modulesOut)
  }, function (e) {
    res.status(400).json(e)
  })
}

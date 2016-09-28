var _ = require('lodash')
var users = require('./users')
var modules = require('./modules')
var catalogs = require('./catalogs')

module.exports = function (db) {
  return {

    Users: function () {
      return _.map(users, function (userDefault) {
        return db.user.create(userDefault)
      })
    },

    UsersTwo: function () {
      return db.user.create({
        name: 'Fernando',
        first_surname: 'Oceguera',
        second_surname: 'Lara',
        email: 'fer@email.com',
        password: 'lorem',
        modules: 'admin_users,admin_forms'
      })
    },

    Modules: function () {
      return _.map(modules, function (moduleDefault) {
        return db.module.create(moduleDefault)
      })
    },

    Catalogs: function () {
      return _.map(catalogs, function (catalogDefault) {
        return db.catalog.create(catalogDefault)
      })
    },
  }
}

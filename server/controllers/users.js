var db = require('../db')
var _ = require('lodash')

var values = [ 'admin_users', 'admin_clients', 'admin_contacts', 'admin_forms', 'admin_schemas', 'admin_operative', 'checklist', 'implement', 'training', 'sampling' ]

// Validate body for user and user.modules
function add (req, isNew) {
  return new Promise(function (resolve, reject) {
    var body

    if (isNew) {
      body = _.pick(req.body, 'name', 'first_surname', 'second_surname', 'email', 'password', 'modules')
    } else {
      body = _.pick(req.body, 'name', 'first_surname', 'second_surname', 'email', 'modules')
    }

    var isArray = _.isArray(req.body.modules)
    var AreDifferencies = _.difference(req.body.modules, values).length === 0

    if (isArray && AreDifferencies) {
      body.modules = _.toString(req.body.modules)
      resolve(body)
    } else {
      reject()
    }
  })
}

exports.addUser = function (req, res) {
  var isNew = true
  add(req, isNew).then(function (body) {
    db.user.create(body).then(function (user) {
      res.json(user.toPublicJSON())
    }, function (e) {
      res.status(400).json(e)
    })
  }).catch(function () {
    return res.status(400).json({ Error: ' The modules validate they are not pass' })
  })
}

exports.updateUsers = function (req, res) {
  var userId = req.params.id
  var isNew = false
  db.user.findOne({
    where: {
      uuid: userId
    }
  }).then(function (userUpdate) {
    add(req, isNew).then(function (body) {
      userUpdate.update(body).then(function (user) {
        res.json(user.toPublicJSON())
      }, function (e) {
        res.status(400).json(e)
      })
  }).catch(function () {
      return res.status(400).json({ Error: ' The modules validate they are not pass' })
    })
  }, function () {
    res.status(500).send()
  })
}

exports.getUsers = function (req, res) {
  db.user.findAll().then(function (users) {
    var userOut = _.map(users, function (user) {
      return {
        uuid: user.uuid,
        name: user.name,
        first_surname: user.first_surname,
        second_surname: user.second_surname,
        email: user.email,
        modules: user.modules,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    })
    res.json(userOut)
  }, function (e) {
    res.status(400).json(e)
  })
}

exports.getUsersById = function (req, res) {
  var userId = req.params.id

  db.user.findOne({
    where: {
      uuid: userId
    }
  }).then(function (user) {
    if (!!user) {
      res.json(user.toPublicJSON())
    } else {
      res.status(404).send()
    }
  }, function (e) {
    res.status(500).send()
  })
}

exports.deleteUsers = function (req, res) {
  var userId = req.params.id

  db.user.destroy({
    where: {
      uuid: userId
    }
  }).then(function (rowsDelete) {
    if (rowsDelete === 0) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  }, function () {
    res.status(500).send()
  })
}

exports.login = function (req, res) {
  var body = _.pick(req.body, 'email', 'password')
  var userInstance

  db.user.authenticate(body).then(function (user) {
    var token = user.generateToken('authentication')
    userInstance = user
    return db.token.create({
      token: token
    })
  }).then(function (tokenInstance) {
    var userResponse = {
      user: userInstance.toPublicJSON(),
      token: tokenInstance.get('token')
    }
    res.json(userResponse)
  }).catch(function () {
    res.status(401).send()
  })
}

// exports.logout = function (req, res) {
//   req.token.destroy().then(function () {
//     res.status(204).send()
//   }).catch(function () {
//     res.status(500).send()
//   })
// }

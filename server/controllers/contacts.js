var db = require('../db')
var _ = require('lodash')
var moment = require('moment')
var env = process.env.NODE_ENV || 'development'

const CATEGORIES = {
  '98e1651e-9715-4095-9cf5-0c03d9b8513e': 'contact_aap',
  '587a0496-82d0-4f27-a27f-ce22f60e3a3c': 'contact_aap',
  'b90d7685-d3e4-494e-809e-d28fa66e933f': 'contact_dist',
  'b0690643-ccd3-496d-8e73-923ead157cb0': 'contact_aap',
  '8f214196-c85f-4182-ad07-4f31420a51d0': 'contact_lab'
}

const CATEGORIES_ADD = {
  '98e1651e-9715-4095-9cf5-0c03d9b8513e': 'addContact_aap',
  '587a0496-82d0-4f27-a27f-ce22f60e3a3c': 'addContact_aap',
  'b90d7685-d3e4-494e-809e-d28fa66e933f': 'addContact_dist',
  'b0690643-ccd3-496d-8e73-923ead157cb0': 'addContact_aap',
  '8f214196-c85f-4182-ad07-4f31420a51d0': 'addContact_lab'
}

exports.addContact = function (req, res) {
  if (req.body.appointment === '') {
    req.body.appointment = moment().format()
  }

  req.body.services = _.toString(req.body.services)

  db.contact.create(req.body).then(function (contact) {
    req.user.addContact(contact).then(function () {

      return contact.reload()

    }).then(function (contact) {

		db[CATEGORIES[contact.category]]
			.create(req.body)
			.then(function(response){
				contact[CATEGORIES_ADD[contact.category]](response)
					.then(function(){
						return response.reload()
					})
			})

      return contact

    })
    .then(function(contact){

      res.json(contact.toJSON())

    })


  }, function(e){

    res.status(400).json(e)

  })
}

// Get /contacts?id=214212424&category=84393493
exports.getContacts = function (req, res) {
  var query = req.query

  if (env === 'production') {
  	/* Production */
  	var where = {
  	  status: 'true'
  	}
  } else {
	   /* Development */
  	var where = {
  		status: true
  	}
  }


  // if (query.hasOwnProperty('id')) {
  //   where.uuid = query.id
  // }
  //
  // if (query.hasOwnProperty('category')) {
  //   where.category = query.category
  // }

   db.contact.findAll({ where: where}).then(function(contacts){
     var contactOut = _.map(contacts, function(user){
       return user
     })
     res.json(contactOut)
   }, function (e) {
     res.status(400).json(e)
   })
}

exports.getContactsById = function (req, res) {
  var contactId = req.params.id
  db.contact.findOne({
    where: {
      uuid: contactId
    }
  }).then(function (contact) {
    if (!!contact) {
      res.json(contact)
    } else {
      res.status(404).send()
    }
  }, function (e) {
    res.status(500).send()
  })
}

exports.deleteContacts = function (req, res) {
  var contacId = req.params.id

  db.contact.destroy({
    where: {
      uuid: contacId
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

exports.getAapById = function (req, res) {
  var contactId = req.params.id
  db.contact_aap.findOne({
    where: {
      contactUuid: contactId
    }
  }).then(function (aap) {
    if (!!aap) {
      res.json(aap)
    } else {
      res.status(404).send()
    }
  }, function (e) {
    res.status(500).send()
  })
}

exports.getLabById = function (req, res) {
  var contactId = req.params.id
  db.contact_lab.findOne({
    where: {
      contactUuid: contactId
    }
  }).then(function (lab) {
    if (!!lab) {
      res.json(lab)
    } else {
      res.status(404).send()
    }
  }, function (e) {
    res.status(500).send()
  })
}

exports.getDistById = function (req, res) {
  var contactId = req.params.id
  db.contact_dist.findOne({
    where: {
      contactUuid: contactId
    }
  }).then(function (dist) {
    if (!!dist) {
      res.json(dist)
    } else {
      res.status(404).send()
    }
  }, function (e) {
    res.status(500).send()
  })
}

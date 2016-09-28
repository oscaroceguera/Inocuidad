var bcrypt = require('bcrypt-nodejs')
var _ = require('lodash')
var cryptojs = require('crypto-js')
var jwt = require('jsonwebtoken')
var uuid = require('uuid')

module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define('user', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: function () {
        return uuid.v1()
      },
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    second_surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    salt: {
      type: DataTypes.STRING
    },
    password_hash: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len: [5, 100]
      },
      set: function (value) {
        var salt = bcrypt.genSaltSync(10)
        var hashedPassword = bcrypt.hashSync(value, salt)

        this.setDataValue('password', value)
        this.setDataValue('salt', salt)
        this.setDataValue('password_hash', hashedPassword)
      }
    },
    modules: {
      type: DataTypes.STRING,
	    allowNull: false
    },
  },{
    hooks: {
      beforeValidate: function (user, options) {
        if (typeof user.email === 'string') {
          user.email = user.email.toLowerCase()
        }
      }
    },
    classMethods: {
      authenticate: function(body){
        return new Promise(function(resolve, reject){
					if(typeof body.email !== 'string' || typeof body.password !== 'string'){
						return reject()
					}

					user.findOne({
						where: {
							email: body.email
						}
					}).then(function(user){
						if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
							return reject()
						}

						resolve(user)

					}, function(e){
						reject()
					})
				})
			},
      findByToken: function (token) {
        return new Promise(function(resolve, reject) {
					try {
						var decodedJWT = jwt.verify(token, 'mar14!@#');
						var bytes = cryptojs.AES.decrypt(decodedJWT.token, 'v0lver4%4&')
						var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8))

						user.findById(tokenData.uuid).then(function(user){
							if (user) {
								resolve(user)
							} else {
								reject()
							}
						}, function(e){
							reject()
						})
					} catch(e) {
						reject()
					}
				});
      }
    },
    instanceMethods: {
      toPublicJSON: function () {
        var json = this.toJSON()
        return _.pick(json, 'uuid', 'name', 'first_surname', 'second_surname', 'email', 'modules', 'createAt', 'updatedAt')
      },
      generateToken: function (type) {
        if (!_.isString(type)) {
          return undefined
        }

        try {
          var stringData = JSON.stringify({uuid: this.get('uuid'), type: type})
          var encryptedData = cryptojs.AES.encrypt(stringData, 'v0lver4%4&').toString()
          var token = jwt.sign({
            token: encryptedData
          }, 'mar14!@#')

          return token
        } catch (e) {
          return undefined
        }
      }
    }
})

  return user
}

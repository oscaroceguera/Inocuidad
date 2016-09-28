var cryptojs = require('crypto-js')
var uuid = require('uuid')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('token', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: function () {
        return uuid.v1()
      },
      primaryKey: true
    },
    token: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len: [1]
      },
      set: function (value) {
        var hash = cryptojs.MD5(value).toString()
        this.setDataValue('token', value)
        this.setDataValue('tokenHash', hash)
      }
    },
    tokenHash: DataTypes.STRING
  })
}

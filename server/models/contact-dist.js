var uuid = require('uuid')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('contact_dist', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: function () {
        return uuid.v1()
      },
      primaryKey: true
    },
    distNumberStores: {
      type: DataTypes.STRING,
      allowNull: false
    },
    distProducts: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}

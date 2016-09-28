var uuid = require('uuid')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('contact_lab', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: function () {
        return uuid.v1()
      },
      primaryKey: true
    },
    labCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    labNom: {
      type: DataTypes.STRING
    },
    labTest: {
      type: DataTypes.STRING
    }
  })
}

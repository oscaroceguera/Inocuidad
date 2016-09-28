var uuid = require('uuid')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('contact_aap', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: function () {
        return uuid.v1()
      },
      primaryKey: true
    },
    aapAmonunt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aapProduct: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aapPacked: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aapNumberShelters: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}

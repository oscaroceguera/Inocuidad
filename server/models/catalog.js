var uuid = require('uuid')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('catalog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    catalog_id: {
      type: DataTypes.UUID
    },
    catalog: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.STRING
    },
    code: {
      type: DataTypes.STRING
    },
    parent_id: {
      type: DataTypes.UUID
    },
    parent: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN
    }
  })
}

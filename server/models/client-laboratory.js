var uuid = require('uuid')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('client_laboratory', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: function () {
        return uuid.v1()
      },
      primaryKey: true
    },
    labName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.UUID,
      allowNull: false
    },
    state: {
      type: DataTypes.UUID,
      allowNull: false
    },
    city: {
      type: DataTypes.UUID,
      allowNull: false
    },
    locality: {
      type: DataTypes.STRING
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number: {
      type: DataTypes.STRING
    },
    neighborhood: {
      type: DataTypes.STRING
    },
    zipCode: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.STRING
    },
    longitude: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    labBranch: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nomImplent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nomWillImplement: {
      type: DataTypes.STRING
    },
    analysis: {
      type: DataTypes.STRING,
      allowNull: false
    },
    analysisWillAcredit: {
      type: DataTypes.STRING
    },
    labAreas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    employeeBase: {
      type: DataTypes.STRING
    },
    employeeEventual: {
      type: DataTypes.STRING
    }

  })
}

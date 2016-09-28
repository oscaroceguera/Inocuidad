var uuid = require('uuid')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('client_pond', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: function () {
        return uuid.v1()
      },
      primaryKey: true
    },
    pondName: {
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
    productiontype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numberPonds: {
      type: DataTypes.STRING,
      allowNull: false
    },
    waterOrigin: {
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

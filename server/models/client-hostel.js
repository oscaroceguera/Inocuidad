var uuid = require('uuid')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('client_hostel', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: function () {
        return uuid.v1()
      },
      primaryKey: true
    },
    hostelName: {
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
    responsibleHostel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    responsiblePhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    responsibleEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numberHouses: {
      type: DataTypes.STRING
    },
    numberInhabitants: {
      type: DataTypes.STRING
    }
  })
}

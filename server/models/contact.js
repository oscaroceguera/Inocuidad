var uuid = require('uuid')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('contact', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: function () {
        return uuid.v1()
      },
      primaryKey: true
    },
    category: {
      type: DataTypes.UUID,
      allowNull: false
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rfc: {
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
    suburb: {
      type: DataTypes.STRING
    },
    zipCode: {
      type: DataTypes.STRING
    },
    companyPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactPosition: {
      type: DataTypes.STRING,
      allowNull: false
    },
    services: {
      type: DataTypes.STRING,
      allowNull: false
    },
    schema: {
      type: DataTypes.STRING
    },
    certification: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trainingTopic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numberPeople: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hierarchicalLevel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    appointment: {
      type: DataTypes.DATEONLY
    },
    comentaries: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  })
}

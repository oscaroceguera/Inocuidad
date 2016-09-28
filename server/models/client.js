var uuid = require('uuid')

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('client', {
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
	      type: DataTypes.STRING,
	    },
	    street: {
	      type: DataTypes.STRING,
	      allowNull: false
	    },
	    number: {
	      type: DataTypes.STRING,
	    },
	    suburb: {
	      type: DataTypes.STRING,
	    },
	    zipCode: {
	      type: DataTypes.STRING,
	    },
	    companyPhone: {
	      type: DataTypes.STRING,
	      allowNull: false
	    },
	    companyEmail: {
	      type: DataTypes.STRING,
	      allowNull: false
	    },
			legalName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			legalEmail: {
				type: DataTypes.STRING,
				allowNull: false
			},
			legalPhone: {
				type: DataTypes.STRING,
				allowNull: false
			},
			inChargeFSName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			inChargeFSPhone: {
				type: DataTypes.STRING,
				allowNull: false
			},
			inChargeFSEmail: {
				type: DataTypes.STRING,
				allowNull: false
			}
	})
}

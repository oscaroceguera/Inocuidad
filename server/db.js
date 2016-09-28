var Sequelize = require('sequelize')
var env = process.env.NODE_ENV || 'development'
var conf = require('./config')
var sequelize

if (env === 'production') {
  sequelize = new Sequelize(conf.database, conf.user, conf.password, {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
  })
} else {
  sequelize = new Sequelize(undefined, undefined, undefined, {
    dialect: 'sqlite',
    storage: __dirname + '/data/dev-tecsia-api.sqlite'
  })
}

var db = {}

db.user = sequelize.import(__dirname + '/models/user.js')
db.token = sequelize.import(__dirname + '/models/token.js')
db.module = sequelize.import(__dirname + '/models/module.js')
db.catalog = sequelize.import(__dirname + '/models/catalog.js')
db.contact = sequelize.import(__dirname + '/models/contact.js')
db.contact_aap = sequelize.import(__dirname + '/models/contact-aap.js')
db.contact_dist = sequelize.import(__dirname + '/models/contact-dist.js')
db.contact_lab = sequelize.import(__dirname + '/models/contact-lab.js')
db.client = sequelize.import(__dirname + '/models/client.js')
db.client_packing = sequelize.import(__dirname + '/models/client-packing.js')
db.client_production = sequelize.import(__dirname + '/models/client-production.js')
db.client_hostel = sequelize.import(__dirname + '/models/client-hostel.js')
db.client_pond = sequelize.import(__dirname + '/models/client-pond.js')
db.client_storage = sequelize.import(__dirname + '/models/client-storage.js')
db.client_laboratory = sequelize.import(__dirname + '/models/client-laboratory.js')
db.client_plant = sequelize.import(__dirname + '/models/client-plant.js')
db.client_storehouse = sequelize.import(__dirname + '/models/client-storehouse.js')

db.sequelize = sequelize
db.Sequelize = sequelize

/*
		RELATIONS
*/

// Contact
db.contact.belongsTo(db.user)
db.user.hasMany(db.contact)
db.contact_aap.belongsTo(db.contact, {onDelete: 'CASCADE'})
db.contact.hasMany(db.contact_aap)
db.contact_dist.belongsTo(db.contact, {onDelete: 'CASCADE'})
db.contact.hasMany(db.contact_dist)
db.contact_lab.belongsTo(db.contact, {onDelete: 'CASCADE'})
db.contact.hasMany(db.contact_lab)
// Client
db.client_packing.belongsTo(db.client, {onDelete: 'CASCADE'})
db.client.hasMany(db.client_packing)

db.client_production.belongsTo(db.client)
db.client.hasMany(db.client_production)

db.client_hostel.belongsTo(db.client)
db.client.hasMany(db.client_hostel)

db.client_pond.belongsTo(db.client)
db.client.hasMany(db.client_pond)

db.client_storage.belongsTo(db.client)
db.client.hasMany(db.client_storage)

db.client_laboratory.belongsTo(db.client)
db.client.hasMany(db.client_laboratory)

db.client_plant.belongsTo(db.client)
db.client.hasMany(db.client_plant)

db.client_storehouse.belongsTo(db.client)
db.client.hasMany(db.client_storehouse)

module.exports = db

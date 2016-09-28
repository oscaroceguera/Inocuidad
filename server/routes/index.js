var db = require('../db')
var Users = require('../controllers/users')
var Modules = require('../controllers/modules')
var Catalogs = require('../controllers/catalogs')
var Contacts = require('../controllers/contacts')
var Clients = require('../controllers/clients')
var middleware = require('../midlewares/users')(db)
var cryptojs = require('crypto-js')

module.exports = function (app) {
  app
    // USER
    .get('/', function (req, res) { res.send('API: Tecsiapp - Salmonella 0.0.0') })
    .post('/admin/users', middleware.requireAuthentication, Users.addUser)
    .get('/admin/users', middleware.requireAuthentication, Users.getUsers)
    .get('/modules', middleware.requireAuthentication, Modules.getModules)
    .delete('/admin/users/:id', middleware.requireAuthentication, Users.deleteUsers)
    .put('/admin/users/:id', middleware.requireAuthentication, Users.updateUsers)
    .get('/admin/users/:id', middleware.requireAuthentication, Users.getUsersById)
    .post('/login', Users.login)
    // .delete('/logout', middleware.requireAuthentication, Users.logout)

    // CATALOGS
    .get('/catalogs', middleware.requireAuthentication, Catalogs.getCatalogs)

    // CONTACT
    .post('/contacts', middleware.requireAuthentication, Contacts.addContact)
    .get('/contacts', middleware.requireAuthentication, Contacts.getContacts)
    .delete('/contacts/:id', middleware.requireAuthentication, Contacts.deleteContacts)
    .get('/contacts/:id', middleware.requireAuthentication, Contacts.getContactsById)
    .get('/contacts/aap/:id', middleware.requireAuthentication, Contacts.getAapById)
    .get('/contacts/lab/:id', middleware.requireAuthentication, Contacts.getLabById)
    .get('/contacts/dist/:id', middleware.requireAuthentication, Contacts.getDistById)

    // CLIENT
    .post('/clients', middleware.requireAuthentication, Clients.addClient)
    .get('/clients', middleware.requireAuthentication, Clients.getClients)
    .get('/clients/:id', middleware.requireAuthentication, Clients.getClientById)
    .put('/clients/:id', middleware.requireAuthentication, Clients.updateClient)
    // CLIENT -> PACKINGS
    .post('/packings/:id', middleware.requireAuthentication, Clients.addPacking)
    .get('/packings/:id', middleware.requireAuthentication, Clients.getPacking)
    .get('/packing/:idPacking', middleware.requireAuthentication, Clients.getPackingById)
    .put('/packings/:id', middleware.requireAuthentication, Clients.updatePacking)
    .delete('/packings/:id', middleware.requireAuthentication, Clients.deletePacking)
    // CLIENT -> PRODUCTIONS
    .post('/productions/:id', middleware.requireAuthentication, Clients.addProduction)
    .get('/productions/:id', middleware.requireAuthentication, Clients.getProduction)
    .get('/production/:idProduction', middleware.requireAuthentication, Clients.getProductionById)
    .put('/productions/:id', middleware.requireAuthentication, Clients.updateProduction)
    .delete('/productions/:id', middleware.requireAuthentication, Clients.deleteProduction)
    // CLIENT -> HOSTEL
    .post('/hostels/:id', middleware.requireAuthentication, Clients.addHostel)
    .get('/hostels/:id', middleware.requireAuthentication, Clients.getHostel)
    .get('/hostel/:idHostel', middleware.requireAuthentication, Clients.getHostelById)
    .put('/hostels/:id', middleware.requireAuthentication, Clients.updateHostel)
    .delete('/hostels/:id', middleware.requireAuthentication, Clients.deleteHostel)
    // CLIENT -> POND
    .post('/ponds/:id', middleware.requireAuthentication, Clients.addPond)
    .get('/ponds/:id', middleware.requireAuthentication, Clients.getPond)
    .get('/pond/:idPond', middleware.requireAuthentication, Clients.getPondById)
    .put('/ponds/:id', middleware.requireAuthentication, Clients.updatePond)
    .delete('/ponds/:id', middleware.requireAuthentication, Clients.deletePond)
    // CLIENT -> STORES
    .post('/storages/:id', middleware.requireAuthentication, Clients.addStorage)
    .get('/storages/:id', middleware.requireAuthentication, Clients.getStorage)
    .get('/storage/:idStorage', middleware.requireAuthentication, Clients.getStorageById)
    .put('/storages/:id', middleware.requireAuthentication, Clients.updateStorage)
    .delete('/storages/:id', middleware.requireAuthentication, Clients.deleteStorage)
    // CLIENT -> LABORATORIES
    .post('/laboratories/:id', middleware.requireAuthentication, Clients.addLaboratory)
    .get('/laboratories/:id', middleware.requireAuthentication, Clients.getLaboratory)
    .get('/laboratory/:idLaboratory', middleware.requireAuthentication, Clients.getLaboratoryById)
    .put('/laboratories/:id', middleware.requireAuthentication, Clients.updateLaboratory)
    .delete('/laboratories/:id', middleware.requireAuthentication, Clients.deleteLaboratory)
    // CLIENT -> PLANTS
    .post('/plants/:id', middleware.requireAuthentication, Clients.addPlant)
    .get('/plants/:id', middleware.requireAuthentication, Clients.getPlant)
    .get('/plant/:idPlant', middleware.requireAuthentication, Clients.getPlantById)
    .put('/plants/:id', middleware.requireAuthentication, Clients.updatePlant)
    .delete('/plants/:id', middleware.requireAuthentication, Clients.deletePlant)
    // CLIENT -> STOREHOUSES
    .post('/storehouses/:id', middleware.requireAuthentication, Clients.addStorehouse)
    .get('/storehouses/:id', middleware.requireAuthentication, Clients.getStorehouse)
    .get('/storehouse/:idStorehouse', middleware.requireAuthentication, Clients.getStorehouseById)
    .put('/storehouses/:id', middleware.requireAuthentication, Clients.updateStorehouse)
    .delete('/storehouses/:id', middleware.requireAuthentication, Clients.deleteStorehouse)
}

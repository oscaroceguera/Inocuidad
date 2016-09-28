var db = require('../db')
var _ = require('lodash')

/* ----------------------------------------------------------------------------
** CLIENTS
*/

exports.addClient = function (req, res) {
  var body = req.body
  db.client
    .create(body)
    .then(function (client) {
      res.json(client.toJSON())
    }, function (e) {
      res.status(400).json(e)
    })
}

exports.getClients = function (req, res) {
  db.client
  .findAll({
    order: [
      ['companyName', 'ASC']
    ]
  })
  .then(function (clients) {
    var clientsOut = _.map(clients, function (client) {
      return client
    })
    res.json(clientsOut)
  }, function (e) {
    res.status(400).json(e)
  })
}

exports.updateClient = function (req, res) {
  var clientId = req.params.id
  db.client.findOne({
    where: {
      uuid: clientId
    }
  })
  .then(function (clientUpdate) {
    clientUpdate
      .update(req.body)
      .then(function (client) {
        res.json(client.toJSON())
      }, function (e) {
        res.status(400).json(e)
      })
      .catch(function () {
        return res.status(400).json({Error: 'Al Actualizar El Cliente'})
      })
  }, function () {
    res.status(500).send()
  })
}

exports.getClientById = function (req, res) {
  var clientId = req.params.id

  db.client
    .findOne({
      where: {
        uuid: clientId
      }
    })
    .then(function (client) {
      if (!!client) {
        res.json(client)
      } else {
        res.status(404).send()
      }
    }, function (e) {
      res.status(500).send()
    })
}

/* ----------------------------------------------------------------------------
** PACKINGS
*/
exports.addPacking = function (req, res) {
  var clientId = req.params.id

  db.client.findOne({
    where: {
      uuid: clientId
    }
  })
  .then(function (client) {
    db.client_packing
    .create(req.body)
    .then(function (packing) {
      client.addClient_packing(packing)
      .then(function () {
        return packing.reload()
      })
      .then(function (packing) {
        res.json(packing.toJSON())
      })
    }, function (e) {
      res.status(400).json(e)
    })
  }, function () {
    res.status(500).send()
  })
}

exports.updatePacking = function (req, res) {
  var id = req.params.id
  db.client_packing.findOne({
    where: {
      uuid: id
    }
  })
  .then(function (packingUpdate) {
    packingUpdate
      .update(req.body)
      .then(function (packing) {
        res.json(packing.toJSON())
      }, function (e) {
        res.status(400).json(e)
      })
      .catch(function () {
        return res.status(400).json({Error: 'Al Actualizar El Empaque'})
      })
  }, function () {
    res.status(500).send()
  })
}

exports.getPacking = function (req, res) {
  var clientId = req.params.id
  db.client_packing
    .findAll({
      where: {
        clientUuid: clientId
      }
    })
    .then(function (packings) {
      var packingsOut = _.map(packings, function (packing) {
        return packing
      })

      res.json(packingsOut)
    }, function (e) {
      res.status(400).json(e)
    })
}

exports.getPackingById = function (req, res) {
  var packingId = req.params.idPacking
  db.client_packing
    .findOne({
      where: {
        uuid: packingId
      }
    })
    .then(function (packing) {
      if (!!packing) {
        res.json(packing)
      }else{
        res.status(404).send()
      }
    }, function (e) {
      res.status(500).send()
    })
}

exports.deletePacking = function (req, res) {
  var id = req.params.id
  db.client_packing.destroy({
    where: {
      uuid: id
    }
  })
  .then(function (rowsDelete) {
    if (rowsDelete === 0) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  }, function () {
    res.status(500).send()
  })
}

/* ----------------------------------------------------------------------------
** PRODUCTION
*/

exports.addProduction = function (req, res) {
  var clientId = req.params.id

  db.client.findOne({
    where: {
      uuid: clientId
    }
  })
  .then(function (client) {
    db.client_production
    .create(req.body)
    .then(function (production) {
      client.addClient_production(production)
      .then(function () {
        return production.reload()
      })
      .then(function (production) {
        res.json(production.toJSON())
      })
    }, function (e) {
      res.status(400).json(e)
    })
  }, function () {
    res.status(500).send()
  })
}

exports.updateProduction = function (req, res) {
  var id = req.params.id
  db.client_production.findOne({
    where: {
      uuid: id
    }
  })
  .then(function (productionUpdate) {
    productionUpdate
      .update(req.body)
      .then(function (production) {
        res.json(production.toJSON())
      }, function (e) {
        res.status(400).json(e)
      })
      .catch(function () {
        return res.status(400).json({Error: 'Al Actualizar La Unidad de Producción'})
      })
  }, function () {
    res.status(500).send()
  })
}

exports.getProduction = function (req, res) {
  var clientId = req.params.id
  db.client_production
    .findAll({
      where: {
        clientUuid: clientId
      }
    })
    .then(function (productions) {
      var productionsOut = _.map(productions, function (production) {
        return production
      })

      res.json(productionsOut)
    }, function (e) {
      res.status(400).json(e)
    })
}

exports.getProductionById = function (req, res) {
  var idProduction = req.params.idProduction
  db.client_production
    .findOne({
      where: {
        uuid: idProduction
      }
    })
    .then(function (production) {
      if (!!production) {
        res.json(production)
      } else {
        res.status(404).send()
      }
    }, function (e) {
      res.status(500).send()
    })
}

exports.deleteProduction = function (req, res) {
  var id = req.params.id
  db.client_production.destroy({
    where: {
      uuid: id
    }
  })
  .then(function (rowsDelete) {
    if (rowsDelete === 0) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  }, function () {
    res.status(500).send()
  })
}

/* ----------------------------------------------------------------------------
** HOSTEL
*/

exports.addHostel = function (req, res) {
  var clientId = req.params.id

  db.client.findOne({
    where: {
      uuid: clientId
    }
  })
  .then(function (client) {
    db.client_hostel
    .create(req.body)
    .then(function (hostel) {
      client.addClient_hostel(hostel)
      .then(function () {
        return hostel.reload()
      })
      .then(function (hostel) {
        res.json(hostel.toJSON())
      })
    }, function (e) {
      res.status(400).json(e)
    })
  }, function () {
    res.status(500).send()
  })
}

exports.updateHostel = function (req, res) {
  var id = req.params.id
  db.client_hostel.findOne({
    where: {
      uuid: id
    }
  })
  .then(function (hostelUpdate) {
    hostelUpdate
      .update(req.body)
      .then(function (hostel) {
        res.json(hostel.toJSON())
      }, function (e) {
        res.status(400).json(e)
      })
      .catch(function () {
        return res.status(400).json({Error: 'Al Actualizar El Albergue'})
      })
  }, function () {
    res.status(500).send()
  })
}

exports.getHostel = function (req, res) {
  var clientId = req.params.id
  db.client_hostel
    .findAll({
      where: {
        clientUuid: clientId
      }
    })
    .then(function (hostel) {
      var hostelOut = _.map(hostel, function (hostel) {
        return hostel
      })

      res.json(hostelOut)
    }, function (e) {
      res.status(400).json(e)
    })
}

exports.getHostelById = function (req, res) {
  var idHostel = req.params.idHostel
  db.client_hostel
    .findOne({
      where: {
        uuid: idHostel
      }
    })
    .then(function (hostel) {
      if (!!hostel) {
        res.json(hostel)
      } else {
        res.status(404).send()
      }
    }, function (e) {
      res.status(500).send()
    })
}

exports.deleteHostel = function (req, res) {
  var id = req.params.id
  db.client_hostel.destroy({
    where: {
      uuid: id
    }
  })
  .then(function (rowsDelete) {
    if (rowsDelete === 0) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  }, function () {
    res.status(500).send()
  })
}

/* ----------------------------------------------------------------------------
** POND
*/

exports.addPond = function (req, res) {
  var clientId = req.params.id

  db.client.findOne({
    where: {
      uuid: clientId
    }
  })
  .then(function (client) {
    db.client_pond
    .create(req.body)
    .then(function (pond) {
      client.addClient_pond(pond)
      .then(function () {
        return pond.reload()
      })
      .then(function (pond) {
        res.json(pond.toJSON())
      })
    }, function (e) {
      res.status(400).json(e)
    })
  }, function () {
    res.status(500).send()
  })
}

exports.updatePond = function (req, res) {
  var id = req.params.id
  db.client_pond.findOne({
    where: {
      uuid: id
    }
  })
  .then(function (pondUpdate) {
    pondUpdate
      .update(req.body)
      .then(function (pond) {
        res.json(pond.toJSON())
      }, function (e) {
        res.status(400).json(e)
      })
      .catch(function () {
        return res.status(400).json({Error: 'Al Actualizar El Estanque'})
      })
  }, function () {
    res.status(500).send()
  })
}

exports.getPond = function (req, res) {
  var clientId = req.params.id
  db.client_pond
    .findAll({
      where: {
        clientUuid: clientId
      }
    })
    .then(function (pond) {
      var pondOut = _.map(pond, function (pond) {
        return pond
      })

      res.json(pondOut)
    }, function (e) {
      res.status(400).json(e)
    })
}

exports.getPondById = function (req, res) {
  var idPond = req.params.idPond
  db.client_pond
    .findOne({
      where: {
        uuid: idPond
      }
    })
    .then(function (pond) {
      if (!!pond) {
        res.json(pond)
      } else {
        res.status(404).send()
      }
    }, function (e) {
      res.status(500).send()
    })
}

exports.deletePond = function (req, res) {
  var id = req.params.id
  db.client_pond.destroy({
    where: {
      uuid: id
    }
  })
  .then(function (rowsDelete) {
    if (rowsDelete === 0) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  }, function () {
    res.status(500).send()
  })
}

/* ----------------------------------------------------------------------------
** STORAGE
*/

exports.addStorage = function (req, res) {
  var clientId = req.params.id

  db.client.findOne({
    where: {
      uuid: clientId
    }
  })
  .then(function (client) {
    db.client_storage
    .create(req.body)
    .then(function (storage) {
      client.addClient_storage(storage)
      .then(function () {
        return storage.reload()
      })
      .then(function (storage) {
        res.json(storage.toJSON())
      })
    }, function (e) {
      res.status(400).json(e)
    })
  }, function () {
    res.status(500).send()
  })
}

exports.updateStorage = function (req, res) {
  var id = req.params.id
  db.client_storage.findOne({
    where: {
      uuid: id
    }
  })
  .then(function (storageUpdate) {
    storageUpdate
      .update(req.body)
      .then(function (storage) {
        res.json(storage.toJSON())
      }, function (e) {
        res.status(400).json(e)
      })
      .catch(function () {
        return res.status(400).json({Error: 'Al Actualizar la Distibuidora'})
      })
  }, function () {
    res.status(500).send()
  })
}

exports.getStorage = function (req, res) {
  var clientId = req.params.id
  db.client_storage
    .findAll({
      where: {
        clientUuid: clientId
      }
    })
    .then(function (storage) {
      var storageOut = _.map(storage, function (storage) {
        return storage
      })

      res.json(storageOut)
    }, function (e) {
      res.status(400).json(e)
    })
}

exports.getStorageById = function (req, res) {
  var idStorage = req.params.idStorage
  db.client_storage
    .findOne({
      where: {
        uuid: idStorage
      }
    })
    .then(function (storage) {
      if (!!storage) {
        res.json(storage)
      } else {
        res.status(404).send()
      }
    }, function (e) {
      res.status(500).send()
    })
}

exports.deleteStorage = function (req, res) {
  var id = req.params.id
  db.client_storage.destroy({
    where: {
      uuid: id
    }
  })
  .then(function (rowsDelete) {
    if (rowsDelete === 0) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  }, function () {
    res.status(500).send()
  })
}

/* ----------------------------------------------------------------------------
** LABORATORIES
*/

exports.addLaboratory = function (req, res) {
  var clientId = req.params.id

  db.client.findOne({
    where: {
      uuid: clientId
    }
  })
  .then(function (client) {
    db.client_laboratory
    .create(req.body)
    .then(function (laboratory) {
      client.addClient_laboratory(laboratory)
      .then(function () {
        return laboratory.reload()
      })
      .then(function (laboratory) {
        res.json(laboratory.toJSON())
      })
    }, function (e) {
      res.status(400).json(e)
    })
  }, function () {
    res.status(500).send()
  })
}

exports.updateLaboratory = function (req, res) {
  var id = req.params.id
  db.client_laboratory.findOne({
    where: {
      uuid: id
    }
  })
  .then(function (laboratoryUpdate) {
    laboratoryUpdate
      .update(req.body)
      .then(function (laboratory) {
        res.json(laboratory.toJSON())
      }, function (e) {
        res.status(400).json(e)
      })
      .catch(function () {
        return res.status(400).json({Error: 'Al Actualizar la Distibuidora'})
      })
  }, function () {
    res.status(500).send()
  })
}

exports.getLaboratory = function (req, res) {
  var clientId = req.params.id
  db.client_laboratory
    .findAll({
      where: {
        clientUuid: clientId
      }
    })
    .then(function (laboratory) {
      var laboratoryOut = _.map(laboratory, function (laboratory) {
        return laboratory
      })

      res.json(laboratoryOut)
    }, function (e) {
      res.status(400).json(e)
    })
}

exports.getLaboratoryById = function (req, res) {
  var idLaboratory = req.params.idLaboratory
  db.client_laboratory
    .findOne({
      where: {
        uuid: idLaboratory
      }
    })
    .then(function (laboratory) {
      if (!!laboratory) {
        res.json(laboratory)
      } else {
        res.status(404).send()
      }
    }, function (e) {
      res.status(500).send()
    })
}

exports.deleteLaboratory = function (req, res) {
  var id = req.params.id
  db.client_laboratory.destroy({
    where: {
      uuid: id
    }
  })
  .then(function (rowsDelete) {
    if (rowsDelete === 0) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  }, function () {
    res.status(500).send()
  })
}

/* ----------------------------------------------------------------------------
** PLANTS
*/

exports.addPlant = function (req, res) {
  var clientId = req.params.id

  db.client.findOne({
    where: {
      uuid: clientId
    }
  })
  .then(function (client) {
    db.client_plant
    .create(req.body)
    .then(function (plant) {
      client.addClient_plant(plant)
      .then(function () {
        return plant.reload()
      })
      .then(function (plant) {
        res.json(plant.toJSON())
      })
    }, function (e) {
      res.status(400).json(e)
    })
  }, function () {
    res.status(500).send()
  })
}

exports.updatePlant = function (req, res) {
  var id = req.params.id
  db.client_plant.findOne({
    where: {
      uuid: id
    }
  })
  .then(function (plantUpdate) {
    plantUpdate
      .update(req.body)
      .then(function (plant) {
        res.json(plant.toJSON())
      }, function (e) {
        res.status(400).json(e)
      })
      .catch(function () {
        return res.status(400).json({Error: 'Al Actualizar la Distibuidora'})
      })
  }, function () {
    res.status(500).send()
  })
}

exports.getPlant = function (req, res) {
  var clientId = req.params.id
  db.client_plant
    .findAll({
      where: {
        clientUuid: clientId
      }
    })
    .then(function (plant) {
      var plantOut = _.map(plant, function (plant) {
        return plant
      })

      res.json(plantOut)
    }, function (e) {
      res.status(400).json(e)
    })
}

exports.getPlantById = function (req, res) {
  var idPlant = req.params.idPlant
  db.client_plant
    .findOne({
      where: {
        uuid: idPlant
      }
    })
    .then(function (plant) {
      if (!!plant) {
        res.json(plant)
      } else {
        res.status(404).send()
      }
    }, function (e) {
      res.status(500).send()
    })
}

exports.deletePlant = function (req, res) {
  var id = req.params.id
  db.client_plant.destroy({
    where: {
      uuid: id
    }
  })
  .then(function (rowsDelete) {
    if (rowsDelete === 0) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  }, function () {
    res.status(500).send()
  })
}

/* ----------------------------------------------------------------------------
** STOREHOUSES
*/

exports.addStorehouse = function (req, res) {
  var clientId = req.params.id

  db.client.findOne({
    where: {
      uuid: clientId
    }
  })
  .then(function (client) {
    db.client_storehouse
    .create(req.body)
    .then(function (storehouse) {
      client.addClient_storehouse(storehouse)
      .then(function () {
        return storehouse.reload()
      })
      .then(function (storehouse) {
        res.json(storehouse.toJSON())
      })
    }, function (e) {
      res.status(400).json(e)
    })
  }, function () {
    res.status(500).send()
  })
}

exports.updateStorehouse = function (req, res) {
  var id = req.params.id
  db.client_storehouse.findOne({
    where: {
      uuid: id
    }
  })
  .then(function (storehouseUpdate) {
    storehouseUpdate
      .update(req.body)
      .then(function (storehouse) {
        res.json(storehouse.toJSON())
      }, function (e) {
        res.status(400).json(e)
      })
      .catch(function () {
        return res.status(400).json({Error: 'Al Actualizar la Distibuidora'})
      })
  }, function () {
    res.status(500).send()
  })
}

exports.getStorehouse = function (req, res) {
  var clientId = req.params.id
  db.client_storehouse
    .findAll({
      where: {
        clientUuid: clientId
      }
    })
    .then(function (storehouse) {
      var storehouseOut = _.map(storehouse, function (storehouse) {
        return storehouse
      })

      res.json(storehouseOut)
    }, function (e) {
      res.status(400).json(e)
    })
}

exports.getStorehouseById = function (req, res) {
  var idStorehouse = req.params.idStorehouse
  db.client_storehouse
    .findOne({
      where: {
        uuid: idStorehouse
      }
    })
    .then(function (storehouse) {
      if (!!storehouse) {
        res.json(storehouse)
      } else {
        res.status(404).send()
      }
    }, function (e) {
      res.status(500).send()
    })
}

exports.deleteStorehouse = function (req, res) {
  var id = req.params.id
  db.client_storehouse.destroy({
    where: {
      uuid: id
    }
  })
  .then(function (rowsDelete) {
    if (rowsDelete === 0) {
      res.status(404).send()
    } else {
      res.status(204).send()
    }
  }, function () {
    res.status(500).send()
  })
}

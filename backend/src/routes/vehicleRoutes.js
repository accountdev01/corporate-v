const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { validateVehicle } = require('../middlewares/validate');

router.route('/')
  .get(vehicleController.getVehicles)
  .post(validateVehicle, vehicleController.createVehicle);

router.route('/:id')
  .get(vehicleController.getVehicleById)
  .put(validateVehicle, vehicleController.updateVehicle)
  .delete(vehicleController.deleteVehicle);

module.exports = router;
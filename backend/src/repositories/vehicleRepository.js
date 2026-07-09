const Vehicle = require('../models/Vehicle');

class VehicleRepository {
  async findAll(filter = {}) {
    return await Vehicle.find(filter).sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Vehicle.findById(id);
  }

  async findByNumber(number) {
    return await Vehicle.findOne({ number });
  }

  async create(vehicleData) {
    return await Vehicle.create(vehicleData);
  }

  async update(id, updateData) {
    return await Vehicle.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await Vehicle.findByIdAndDelete(id);
  }
}

module.exports = new VehicleRepository();
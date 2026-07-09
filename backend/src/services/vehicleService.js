const vehicleRepository = require('../repositories/vehicleRepository');

class VehicleService {
  async getAllVehicles(search) {
    let filter = {};
    if (search) {
      filter.$or = [
        { number: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } }
      ];
    }
    return await vehicleRepository.findAll(filter);
  }

  async getVehicleById(id) {
    const vehicle = await vehicleRepository.findById(id);
    if (!vehicle) throw new Error('VEHICLE_NOT_FOUND');
    return vehicle;
  }

  async createVehicle(vehicleData) {
    const existingVehicle = await vehicleRepository.findByNumber(vehicleData.number);
    if (existingVehicle) throw new Error('VEHICLE_NUMBER_ALREADY_EXISTS');

    return await vehicleRepository.create(vehicleData);
  }

  async updateVehicle(id, updateData) {
    await this.getVehicleById(id);
    return await vehicleRepository.update(id, updateData);
  }

  async deleteVehicle(id) {
    await this.getVehicleById(id);
    return await vehicleRepository.delete(id);
  }
}

module.exports = new VehicleService();
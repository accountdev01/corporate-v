const vehicleService = require('../services/vehicleService');

const handleServiceError = (res, error) => {
  if (error.message === 'VEHICLE_NOT_FOUND') return res.status(404).json({ message: 'ไม่พบข้อมูลนี้' });
  if (error.message === 'VEHICLE_NUMBER_ALREADY_EXISTS') return res.status(400).json({ message: 'ทะเบียนรถนี้มีอยู่ในระบบแล้ว' });
  
  return res.status(500).json({ message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์', error: error.message });
};

exports.getVehicles = async (req, res) => {
  try {
    const { search } = req.query;
    const vehicles = await vehicleService.getAllVehicles(search);
    res.status(200).json({ status: 'success', data: vehicles });
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicleById(req.params.id);
    res.status(200).json({ status: 'success', data: vehicle });
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.createVehicle = async (req, res) => {
  try {
    const newVehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json({ status: 'success', data: newVehicle });
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const updatedVehicle = await vehicleService.updateVehicle(req.params.id, req.body);
    res.status(200).json({ status: 'success', data: updatedVehicle });
  } catch (error) {
    handleServiceError(res, error);
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    await vehicleService.deleteVehicle(req.params.id);
    res.status(200).json({ status: 'success', message: 'ลบข้อมูลเรียบร้อยแล้ว' });
  } catch (error) {
    handleServiceError(res, error);
  }
};
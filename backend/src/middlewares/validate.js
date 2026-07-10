const { z } = require('zod');

const vehicleSchemaZod = z.object({
  number: z.string().min(2, "กรุณาระบุเลขทะเบียนรถ"),
  brand: z.string().min(1, "กรุณาระบุยี่ห้อ"),
  model: z.string().min(1, "กรุณาระบุรุ่น"),
  notes: z.string().optional().default(""),
  etc: z.string().optional().default("")
});

const validateVehicle = (req, res, next) => {
  try {
    vehicleSchemaZod.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ 
      status: 'fail', 
      errors: error.errors.map(e => ({ field: e.path[0], message: e.message })) 
    });
  }
};

module.exports = { validateVehicle };

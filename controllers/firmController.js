const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

const addFirmtoVendor = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ error: 'vendor not found' });
    }

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id
    });

    const savedFirm = await firm.save();
    vendor.firm.push(savedFirm._id);
    await vendor.save();

    return res.status(200).json({ message: 'firm added successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

const deleteFirmById = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const deleteFirm = await Firm.findByIdAndDelete(firmId);

    if (!deleteFirm) {
      return res.status(404).json({ error: "Firm not found" });
    }

    res.status(200).json({ message: "Firm successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  addFirmtoVendor: [upload.single('image'), addFirmtoVendor],
  deleteFirmById
};

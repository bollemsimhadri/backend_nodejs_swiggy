const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv'); 

dotEnv.config();
const secretKey = process.env.MY_SECRET_KEY

const verfyToken = async (req, res, next) => {
    const token = req.headers.token

    if(!token){
        return res.status(400).json({error:'Token is required'});
    }

    try{
        const decoded = jwt.verify(token, secretKey)
        const vendor = await Vendor.findById(decoded.vendorId);

        if(!vendor){
            return res.status(404).json({error:'vendor not found'})
        }

        req.vendorId = vendor._id

        next()

    }catch(error){
        console.log(error);
        return res.status(500).json({ error: "In valid token" });
    }
}

module.exports = verfyToken
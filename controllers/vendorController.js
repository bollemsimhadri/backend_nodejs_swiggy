const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");

const Vendor = require('../models/Vendor');

dotEnv.config();
const secretKey = process.env.MY_SECRET_KEY

const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const vendorEmail = await Vendor.findOne({ email })
        if (vendorEmail) {
            return res.status(400).json("Email already taken")
        }

        const hashedPssaword = await bcrypt.hash(password, 10)

        const newVendor = new Vendor({
            username,
            email,
            password: hashedPssaword
        })

        await newVendor.save();
        res.status(200).json({ message: "Vender register successfully" })
        console.log("registread")

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }

}



const vendorLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "80h" })

        res.status(200).json({ success: "Login successful", token });
        console.log(`login email ${email}`)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const getALLVendors = async (req, res) => {

    try {
        const vendors = await Vendor.find().populate('firm')
        res.json(vendors)

    } catch (error) {

        console.log(error);
        res.status(404).json({ error: "Internal server error" });

    }
}

const getSingleVendorById = async (req, res)=>{
    const vendorId = req.params.id
    try{
        const vendor = await Vendor.findById(vendorId).populate('firm')
        if(!vendor){
            return res.status(404).json({error:"vendor not found"})
        }
        res.status(200).json({vendor})
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }

}

module.exports = { vendorRegister, vendorLogin, getALLVendors, getSingleVendorById}
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAdmin = async(req,res)=>{
    try{
        const{name,email,password,phone} = req.body;
        const hashedPassword = await bcrypt.hash(password,15);
        const admin1 = new Admin({
            name,
            email,
            password:hashedPassword,
            phone
        })

        await admin1.save()
        res.status(200).json({message:"Admin Data has been created"})
    }catch(error){
        console.log(`There is an error : ${error}`)
        res.status(500).json({message:"Server Error "});
    }
    
}
const adminLogin = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const admin1 = await Admin.findOne({email});
        if(!admin1){
            return res.status(404).json({message:"Invalid Credencials"})
        }

        const passwrodMatches = await bcrypt.compare(password, admin1.password);
        if(!passwrodMatches){
            return res.status(500).json({message:"Incorrect Password"});
        }

        const payload = {email:admin1.email};
        const jwtToken = jwt.sign(payload,process.env.secretKey);
        res.send({token:jwtToken});
        console.log(jwtToken);
    
    }catch(error){
        console.log(`There is an error ${error}`)
        res.status(200).json({message:"Logged In successfully"})
    }
}

module.exports = {createAdmin,adminLogin};
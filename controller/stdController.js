const Student = require('../models/Student');
const createStudent = async(req,res)=>{
    try{
        const {name,paymentStatus,courseName,phone} = req.body;
        const student = new Student({
            name,
            paymentStatus,
            courseName,
            phone

        })
        await student.save()
        res.json(student).status(200)
    } catch(error){
        console.log(`An Error has been occured ${error}`)
        res.status(500).json({message:"Server Error"});
    }
}

const getData = async(req,res)=>{
    try{
        const stdInfo = await Student.find();
       res.json(stdInfo).status(200);
    } catch(error){
        console.log(`There is an error while fetching the details ${error}`)
        res.status(500).json({message:"Server Error "});
    }
}
const singleData = async(req,res)=>{
    try{
        const stdData = await Student.findOne(req.params.phone);
        if (!stdData){
            return res.status(500).json({message:"data is not available"})
        }
        res.status(200).json(stdData);
    }catch(error){
        console.log(`There is an error ${error}`);
        res.status(500).json({message:"Server Error "})
    }

}
const updateStudent = async(req,res)=>{
    try{
        const {name,paymentStatus,courseName,phone}= req.body;
        const dataUpdate = await Student.findOneAndUpdate(req.params.phone,
           { name,
            paymentStatus,
            courseName,
            phone
        })
    
        if(!dataUpdate){
           return res.status(500).json({message:"Data not found"});
           
        } res.status(200).json(dataUpdate)
    } catch(error){
        console.log(`There is an error while update the data ${error}`)
        res.status(200).json({message:"Server Not working at this moment"})
    }
}

const deleteStudent = async(req,res)=>{
    try{
        const deleteStudent = await Student.findOneAndDelete(req.params.phone);
        if(!deleteStudent){
            return res.status(500).json({message:"Not be delete at present"});
        }
        res.status(200).json({message:"The data has been deleted succesfully"});
    }catch(error){
        console.log(`There is an error while deleting the date ${error}`)
    }
}

module.exports = {createStudent,getData,singleData,updateStudent,deleteStudent};
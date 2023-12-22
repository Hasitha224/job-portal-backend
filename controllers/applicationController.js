const applicationSchema = require('../models/applicationSchema');

const submitApplication = async (req,res)=>{
    try{
        const {jobPosition,jobTitle,nameWithInitials,fullName,gender,dob,nic,email,landlineNumber,mobileNumber,field, eduDetails,educationalQualifications, experience, extracurricular, otherQualifications,
            cvFileDataUrl,cvFileName,olSubjects,alSubjects,olGrades,alGrades} = req.body;
        
        const { _id: user_id } = req.user;
        
        const newApplication = new applicationSchema({
            jobPosition,
            jobTitle,
            nameWithInitials,
            fullName,
            gender,
            dob,
            nic,
            email,
            landlineNumber,
            mobileNumber,
            field,
            eduDetails,
            educationalQualifications,
            experience,
            extracurricular,
            otherQualifications,
            cvFileDataUrl,
            cvFileName,
            submittedDate: new Date(),
            status:'Pending',
            user_id,
        });

        if(eduDetails==='ol'){
            newApplication.olSubjects = olSubjects || [];
            newApplication.olGrades = olGrades || [];
        }else{
            newApplication.olSubjects = [];
            newApplication.olGrades = [];
        }

        if(eduDetails==='al'){
            newApplication.alSubjects = alGradeslSubjects || [];
            newApplication.alGrades = alGrades || [];
        }else{
            newApplication.alSubjects = [];
            newApplication.alGrades = [];
        }

        await newApplication.save();
        return res.status(201).json({'message':'Application successfully saved'});
    }catch(error){
        console.error('Error in submitting application:', error);
        return res.status(500).json({'message':'internal server error'});
    }
}

const editStatusToAccept = async(req,res)=>{
    const appId = req.params._id;
    try{
        await applicationSchema.findByIdAndUpdate(appId,{status: 'Accepted'});
        res.json({ message: 'Application status updated successfully' });
    }catch(error){
        console.error('Error editing data: ',error);
        return res.status(500).json({'message':'internal server error'});
    }
}
const editStatusToReject = async(req,res)=>{
    const appId = req.params._id;
    try{
        await applicationSchema.findByIdAndUpdate(appId,{status: 'Rejected'});
        res.json({ message: 'Application status updated successfully' });
    }catch(error){
        console.error('Error editing data: ',error);
        return res.status(500).json({'message':'internal server error'});
    }
}

const getPending = async (req,res)=>{
    try{
        const getData = await applicationSchema.find({'status':'Pending'});
        return res.status(200).json(getData);
    }catch(error){
        console.error('Error getting data: ',error);
        return res.status(500).json({'message':'internal server error'});
    }
}
const getAccepted = async (req,res)=>{
    try{
        const getData = await applicationSchema.find({'status':'Accepted'});
        return res.status(200).json(getData);
    }catch(error){
        console.error('Error getting data: ',error);
        return res.status(500).json({'message':'internal server error'});
    }
}
const getRejected = async (req,res)=>{
    try{
        const getData = await applicationSchema.find({'status':'Rejected'});
        return res.status(200).json(getData);
    }catch(error){
        console.error('Error getting data: ',error);
        return res.status(500).json({'message':'internal server error'});
    }
}

const deleteById = async (req,res)=>{
    const appId = req.params._id;
    try{
        const deleteData = await applicationSchema.findByIdAndDelete(appId);
        if(deleteData){
            return res.status(204).json({'message':'Application successfully deleted'});
        }else{
            return res.status(404).json({'message':'Not found'});
        }  
    }catch(error){
        console.error('Error in application Delete:', error);
        return res.status(500).json({'message':'Internal server error'});
    }
    
}

module.exports = {submitApplication,getPending,deleteById,editStatusToAccept,editStatusToReject,getAccepted,getRejected};
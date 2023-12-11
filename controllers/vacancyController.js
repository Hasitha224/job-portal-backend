const vacancySchema = require('../models/vacancySchema');

const vacancyCreate = async (req,res)=>{
    try{
        const{jobField, jobPosition, jobDescription, salary, dueDate, workLocation, workType, workMethod, requiredSkills ,
            educationalQualifications, olSubjects, alSubjects, undergraduate, postgraduate} = req.body;
        const newVacancy = new vacancySchema({
            jobField,
            jobPosition,
            jobDescription,
            salary,
            dueDate,
            workLocation,
            workType,
            workMethod,
            requiredSkills: requiredSkills || [],
            educationalQualifications,
            createdDate: new Date(),
        })


        if(educationalQualifications==='ol'){
            newVacancy.olSubjects = olSubjects || [];
        }else{
            newVacancy.olSubjects = [];
        }

        if(educationalQualifications==='al'){
            newVacancy.alSubjects = alSubjects || [];
        }else{
            newVacancy.alSubjects = [];
        }

        newVacancy.undergraduate = undergraduate || false;
        newVacancy.postgraduate = postgraduate || false;

        
        await newVacancy.save();

        return res.status(201).json({'message':'vacancy created'});
    }catch(error){
            // Log the detailed error information
        console.error('Error in vacancyCreate:', error);
        return res.status(500).json({'message':'internal server error'});
    }
}

const getAll = async (req,res)=>{
    try{
        const getData = await vacancySchema.find();
        return res.status(200).json(getData);
    }catch(error){
        console.error('Error in vacancyGet:', error);
        return res.status(500).json({'message':'internal server error'});
    }
}

const deleteById = async (req,res)=>{
    const vacancyId = req.params._id;
    try{
        const deleteData = await vacancySchema.findByIdAndDelete(vacancyId);
        if(deleteData){
            return res.status(204).json({'message':'Vacancy successfully deleted'});
        }else{
            return res.status(404).json({'message':'Not found'});
        }  
    }catch(error){
        console.error('Error in vacancyDelete:', error);
        return res.status(500).json({'message':'Internal server error'});
    }
    
}

const editVacancy = async (req,res)=>{
    const vacancyId = req.params._id;
    const updatedData = req.body;
    try{
        const updatedVacancy = await vacancySchema.findByIdAndUpdate(vacancyId, updatedData, { new: true });
        if (!updatedVacancy) {
            return res.status(404).json({ error: 'Vacancy not found' });
        }
        return res.status(200).json({'message':'vacancy successfully updated'});
    }catch(error){
        console.error('Error in updating vacancy: ',error);
        return res.status(500).json({'message':'internal server error'});
    }
}

const getVacancyById = async(req,res)=>{
    const vacancyId = req.params._id;
    try{
        const findVacancy = await vacancySchema.findById(vacancyId);
        if(!findVacancy){
            return res.status(404).json({'message':'vacancy not found'});
        }
        return res.status(200).json(findVacancy);
    }catch(error){
        console.error('Error in fetching vacancy by Id: ',error);
        return res.status(500).json({'message':'internal server error'});
    }
}
module.exports = {vacancyCreate,getAll,deleteById,editVacancy,getVacancyById}
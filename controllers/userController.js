const userSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const salt = 10;
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
const applicationSchema = require('../models/applicationSchema');

const imagePath = path.join(__dirname, '../utils/images/congrats.jpg');

const register = (req,res)=>{
    userSchema.findOne({email:req.body.email}).then(result=>{
        if(result==null){
            bcrypt.hash(req.body.password,salt,(err,hash)=>{
                if(err){
                    return res.status(500).json(err);
                }
                const user = new userSchema({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email:req.body.email,
                    password:hash,
                    isAdmin:req.body.isAdmin
                });

                // const transporter = nodemailer.createTransport({
                //     service:'gmail',
                //     auth:{
                //         user:'testhasi97@gmail.com',
                //         pass:'esfb eiat pfrw aoqw',
                //     }
                // });

                // const mailOption = {
                //     from:'SLT Job-Portal <testhasi97@gmail.com>',
                //     to:req.body.email,
                //     subject:'New Account Creation',
                //     // text:'Congraluations, you have successfully created your account at SLT Job Portal System.'
                //     html: `<h2>Congratulations, you have successfully created your account at SLT Job Portal System.</h2><img src="cid:unique-image-id" alt="Congrats Image">`,
                //     attachments: [{
                //         filename: 'congrats.jpg',
                //         path: imagePath,
                //         cid: 'unique-image-id'  // Unique ID for referencing the image in the HTML
                //     }]
                // }

                // transporter.sendMail(mailOption,function (error,info){
                //     if(error){
                //         return res.status(500).json({'error':error});
                //     } else{
                        user.save().then(saveResponse=>{
                            res.status(201).json({"message":'Saved'})
                        }).catch(error=>{
                            res.status(500).json(error);
                        });
                    
                })
            
        }else{
            return res.status(409).json({'error': 'already existing user'});
        }
    });
}

const login = (req,res)=>{
    userSchema.findOne({email:req.body.email}).then(selectedUser=>{
        if(selectedUser!==null){
            bcrypt.compare(req.body.password,selectedUser.password,function(err,result){
                if(err){
                    return res.status(500).json({'message':'internal server error'});
                }
                if(result){
                    const { isAdmin, _id } = selectedUser;
                    const payLoad = {
                        _id,
                        email : selectedUser.email,
                        isAdmin: isAdmin
                    }
                    const secretKey = process.env.SECRET_KEY;
                    const expiresIn = '24h';

                    const token = jsonwebtoken.sign(payLoad,secretKey,{expiresIn});
                    return res.status(200).json({token,isAdmin});

                }else{
                    return res.status(401).json({'message':'Invalid password'});
                }
            });
        }else{
            return res.status(404).json({'error':'user not found'});
        }
        
    });
}

const statusOfApplications = async (req,res)=>{
    try{
        const userId = req.user._id;
        const userStatus = await applicationSchema.find({user_id: userId});
        res.json(userStatus); 
    }catch(error){
        console.error('Error fetching data: ',error);
        return res.status(500).json({'message':'internal server error'});
    }

}

module.exports = {register,login,statusOfApplications};
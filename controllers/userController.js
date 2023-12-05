const userSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');
const salt = 10;
const jsonwebtoken = require('jsonwebtoken');

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
                    const { isAdmin } = selectedUser;
                    const payLoad = {
                        email : selectedUser.email,
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

module.exports = {register,login};
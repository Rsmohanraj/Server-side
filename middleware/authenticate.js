const ErrorHandler = require('../Utils/errorHandler');
const User = require('../models/userModel')
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
exports.isAuthenticatedUser =  catchAsyncError(async (req, res, next) => {
 const ticket = req.header("Authorization")?.split ("") [1];
 if(!ticket)
    return res.status(401).json({message:"Access Denied"});
try{
    const  verified =jwt.verify(ticket,process.env.JWT_SECRET);
    req.userId = verified.user.id;
    next();
} catch(error){
    return res.status(401).json({message:"Token is not valid"});
 
}
})
   exports.authorizeRoles =(...roles) => {
    return  async (req, res, next) => {
        try{
            const user = await User.findById(req.userId);
            if(!user || !roles.includes(req.user.role)){
                return res.status(403).json({message:"Token is not valid"});
            }
           
           next();
        }catch(error){
            res.status(500).json({message:"Server error"})
        }
        
      
    };
   };

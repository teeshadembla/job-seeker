import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js";
import {sendToken} from "../utils/jwtToken.js";

export const register = catchAsyncError(async(req,res,next)=>{
    const {name,email,phoneNumber,password,role} = req.body;
    if(!name || !email || !phoneNumber || !password || !role){
        return next(new ErrorHandler("Please fill full registration form detials"));
    }
    const isEmail = await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandler("You are already registered"));
    }
    const user = await User.create({
        name,
        email,
        phoneNumber,
        role,
        password,
    });
    sendToken(user,200,res,"User registered Successfully");
});



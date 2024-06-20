import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js";

export const register = catchAsyncError(async(req,res,next)=>{
    const {name,email,phone,password,role} = req.body;
    if(!name || !email || !phone || !password || !role){
        return next(new ErrorHandler("Please fill full registration form detials"));
    }
    const isEmail = await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandler("You are already registered"));
    }
    const user = await User.create({
        name,
        email,
        phone,
        role,
        password,
    });
    res.status(200).json({
        success: true,
        message: "user registrered!",
        user,
    });
});


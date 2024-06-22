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

export const login = catchAsyncError(async(req,res,next)=>{
    const {email,password,role} = req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("Kindly provide email, password, role",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",400));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",400));
    }

    if(user.role !== role){
        return next(new ErrorHandler("User with this role not found",400));
    }

    sendToken(user,200,res,"User logged in successfully");
});

export const logout = catchAsyncError(async(req,res,next)=>{
    res.status(201).cookie("token","",{
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "user log out successful",
    });
});

export const getUser = catchAsyncError((req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "User access successful",
        user,
    })
})
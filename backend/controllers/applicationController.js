import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import {Job} from "../models/jobSchema.js";

//employer fiddles with application
export const empGetAllAppl = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("you must be an employer to access all applications to your job listing"));
    }
    const {_id} = req.user;
    const applications = await Application.find({"employerId.user":_id});
    res.status(200).json({
        success: true,
        applications,
    })
});

//job seekers access their applications
export const jobSeekersGetAllAppl = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("you must be a Job Seeker to access all applications to your job listing"));
    }
    const {_id} = req.user;
    const applications = await Application.find({"applicantId.user":_id});
    res.status(200).json({
        success: true,
        applications,
    })
});

//since only job seekers can delete applications
export const seekerDeleteAppl = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("you must be a Job Seeker to delete applications to your job listing"));
    }
    const {id} = req.params  ;
    const application  = await Application.findById(id);
    if(!application){
        return next(new ErrorHandler("Oops application not found",404));
    }
    application.deleteOne();
    res.status(200),json({
        success:true,
        message:"application deleted successfully",
    })
});

//only seekers can add applications
export const postAppl = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Employer"){
        return next(
            new ErrorHandler("Employer is not allowed to access this resource",400)
        );
    }
    /* if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Resume file required"));
    }

    const {resume } = req.files;
    const allowedFormats = ["image/png","image/jpg","image/webp"];
    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler("Invalid file type. Only png,jpg or webp formats are allowed",400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error:",cloudinaryResponse.error || "Unknown Cloudinary error");
        return next(new ErrorHandler("Failed to upload resume",500));
    } */
    const {name,email,coverLetter,phoneNumber,address,jobId,resume} = req.body;
    const applicantId = {
        user: req.user._id,
        role: "Job Seeker",
    };
    if(!jobId){
        return next(new ErrorHandler("Job not found",404));
    }
    const jobDetails = await Job.findById(jobId);
    if(!jobDetails){
        return next(new ErrorHandler("Job not found",404));
    }
    const employerId={
        user:jobDetails.postedBy,
        role:"Employer",
    };

    if(!name || !email || !coverLetter || !phoneNumber || !address || !applicantId || !employerId || !resume){
        return next(new ErrorHandler("please fill all fields",400));
    }

    const application = await Application.create({
        name,email,coverLetter,phoneNumber,address,applicantId,employerId,
        resume,/* : {
            public_id: cloudinaryResponse.public._id,
            url: cloudinaryResponse.secure_url,
        } */
    });

    res.status(200).json({
        success:true,
        message:"Successfull submission",
        application,
    })

})

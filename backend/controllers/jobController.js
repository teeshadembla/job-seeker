import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {Job} from "../models/jobSchema.js";

//function to get all jobs
export const getAllJobs = catchAsyncError(async(req,res,next)=>{
    const jobs = await Job.find({expired: false});
    res.status(200).json({
        success : true,
        jobs,
    });
});

//function to post a new job
export const postNewJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("You must be registered as an employer to post a new Job",400));
    }
    let {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo} = req.body;
    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler("You must enter all of the required details to post a job"));
    }
    if((!salaryFrom || !salaryTo)&& !fixedSalary){
        return next(new ErrorHandler("You must add either ranged salary or a fixed salary"));
    }
    if(salaryFrom && salaryTo && !fixedSalary){
        return next(new ErrorHandler("Cannot enter both fixed salary and ranged salary"));
    }
    const postedBy = req.user._id;
    console.log({title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo,postedBy});
    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy,
    });
    res.status(200).json({
        success: true,
        message: "Job posted succesfully!",
        job,
    });
});

export const getMyJobs = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("You must be registered as an employer to post a new Job",400));
    }
    const {id} = req.user;
    const myJobs = await Job.find({postedBy :id});
    console.log(myJobs);
    res.status(200).json({
        success:true,
        message:"Here is your data",
        myJobs,
    })
})

export const updateJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("You must be registered as an employer to post a new Job",400));
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Oop! JOb not found",404));
    }
    job = await Job.findByIdAndUpdate(id,req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        job,
        message:"Job updated successfully",
    })
});

export const deleteJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("You must be registered as an employer to post a new Job",400));
    }
    const {id} = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Oop! JOb not found",404));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job Deleted!",
    });
})

export const getSingleJob = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
      const job = await Job.findById(id);
      if (!job) {
        return next(new ErrorHandler("Job not found.", 404));
      }
      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
  });

  
 
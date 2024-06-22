import mongoose from "mongoose";
const Schema  = mongoose.Schema;

const jobSchema = new Schema({
    title: {
        type:String,
        minLength: [3,"Please enter a job title that has atleast 3 characters"],
        maxLength: [40,"Kindly enter a shorter title to conform to maximum length of 40 characters"],
        required: [true,"Kindly provide a job title"],
    },
    description: {
        type:String,
        required: [true,"Kindly enter a description"],
        minLength: [50,"Please enter a job description that has atleast 50 characters"],
        maxLength: [350,"Kindly enter a shorter description to conform to maximum length of 350 characters"],
    },
    category: {
        type:String,
        required: [true,"Category is required"],
    },
    country: {
        type: String,
        required: [true,"Kindly enter the country for place of work"],
    },
    city: {
        type: String,
        required: [true,"Kindly enter city you want to work in"],
    },
    location: {
        type:String,
        required: [true,"Please provide the address of your work"],
        minLength: [50,"Kindly enter an address with atleast 50 characters"],
        maxLength: [350,"Kindly enter an address that conforms to the maximum length condition of 350 characters"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4,"Salary bracket is over 999"],
        maxLenght: [9,"Salary must have atmost 9 digits"],
    },
    salaryFrom: {
        type:Number,        
        minLength: [4,"Salary bracket is over 999"],
        maxLenght: [9,"Salary must have atmost 9 digits"],
    },
    salaryTo: {
        type:Number,
        minLength: [4,"Salary bracket is over 999"],
        maxLenght: [9,"Salary must have atmost 9 digits"],
    },
    expired: {
        type: Boolean,
        default: false,
    },
    postedOn :{
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref : "User",
        required: true,
    },
});

export const Job = new mongoose.model("Job",jobSchema);
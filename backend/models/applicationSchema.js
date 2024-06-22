import { application } from "express";
import mongoose from "mongoose";
import validator from "validator";
const Schema = mongoose.Schema;

const applicationSchema = Schema({
    name: {
        type:String,
        required: [true,"Kindly enter your name"],
        maxLength: [40,"Kinldy enter a name that conforms to maximum length of 40"],
    },
    email:{
        type: String,
        validator: [validator.isEmail,"Please provide valid email"],
        required: [true,"Kindly provide a working email"],
    },
    coverLetter: {
        type: String,
        required: [true,"Kindly provide your cover letter"],
        maxLength: [550, "Do no exceed 550 characters"],
    },
    phoneNumber: {
        type: Number,
        required: [true,"Kindly enter a working phone number"],
    },
    address: {
        type:String,
        required: [true,"Kindly provide your current residential address"],
    },
    resume: {
        type:String,
        required: true,
    },
    applicantId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role:{
            type: String,
            enum: ["Job Seeker"],
            required: true,
        }
    },
    employerId: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role:{
            type: String,
            enum: ["Employer"],
            required: true,
        }
    }
});

export const Application = new mongoose.model("Application",applicationSchema);
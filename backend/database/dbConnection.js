import mongoose from "mongoose";


export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"JOB_FINDER"
    }).then(()=>{
        console.log("db connection established");
    }).catch((err)=>{
        console.log(err);
    })
}




   
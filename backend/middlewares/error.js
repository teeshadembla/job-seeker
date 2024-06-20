
class ErrorHandler extends Error{
    constructor(message,statusCode){
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || "Internal Server error";
    err.statusCode = err.statusCode || 500;

    if(err.name === "CastError"){
        const message = `Resource not found. Invalid ${path}`;
        err = new ErrorHandler(message, 400);
    }
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.KeyValue)}`;
        err = new ErrorHandler(message,400);
    }
    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is Invalid. Try Again`;
        err = new ErrorHandler(message,400);
    }
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token Expired. Try Again`;
        err = new ErrorHandler(message,400);
    }
    return res.status(statusCode).json({
        success:false,
        message: err.message,
    });
};

export default ErrorHandler;
import express from "express";
import {getAllJobs,postNewJob,getMyJobs,updateJob,deleteJob} from "../controllers/jobController.js";
import {isAuthorized} from "../middlewares/auth.js";

const router = express.Router();

router.get("/allJobs",getAllJobs);
router.post("/newJob",isAuthorized,postNewJob);
router.get("/myJobs",isAuthorized,getMyJobs);
router.put("/update/:id",isAuthorized,updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);


export default router;
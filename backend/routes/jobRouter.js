import express from "express";
import {getAllJobs,postNewJob,getMyJobs,updateJob,deleteJob,getSingleJob} from "../controllers/jobController.js";
import {isAuthorized} from "../middlewares/auth.js";

const router = express.Router();

router.get("/allJobs",getAllJobs);
router.get("/:id", isAuthorized, getSingleJob);
router.post("/newJob",isAuthorized,postNewJob);
router.get("/myJobs",isAuthorized,getMyJobs);
router.put("/update/:id",isAuthorized,updateJob);
router.delete("/delete/:id", isAuthorized, deleteJob);


export default router;
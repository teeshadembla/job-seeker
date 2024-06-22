import express from "express";
import {empGetAllAppl,jobSeekersGetAllAppl,seekerDeleteAppl,postAppl} from "../controllers/applicationController.js";
import {isAuthorized} from "../middlewares/auth.js";

const router = express.Router();

router.get("/empGetAppl",isAuthorized,empGetAllAppl);
router.get("/seekerGetAppl",isAuthorized,jobSeekersGetAllAppl);
router.post("/seekerPostAppl",isAuthorized,postAppl);
router.delete("/delete/:id",isAuthorized,seekerDeleteAppl);


export default router;
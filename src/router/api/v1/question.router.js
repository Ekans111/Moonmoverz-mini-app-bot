import { Router } from "express";
import { test, GetQuestion, SetQuestionResult } from "../../../controller/question.controller.js";

const router = Router();

router.get("/test", test);
router.get("/get/:id", GetQuestion);
router.post("/setresult", SetQuestionResult);

export default router;
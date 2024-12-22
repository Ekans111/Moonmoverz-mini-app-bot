import { Router } from "express";
import { test, setTask, getTask } from "../../../controller/task.controller.js";

const router = Router();

router.get("/test", test);
router.post("/set", setTask);
router.post("/get", getTask);

export default router;
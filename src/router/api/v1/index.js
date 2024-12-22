import { Router } from "express";

import userRouter from "./user.router.js";
import tokenRouter from "./token.router.js";
import rankRouter from "./rank.router.js";
import taskRouter from "./task.router.js";
import questionRouter from "./question.router.js";
import friendRouter from "./friend.router.js";

const router = Router();

router.use("/user", userRouter);
router.use("/token", tokenRouter);
router.use("/rank", rankRouter);
router.use("/task", taskRouter);
router.use("/question", questionRouter);
router.use("/friend", friendRouter);

export default router;
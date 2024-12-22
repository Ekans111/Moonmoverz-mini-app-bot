import { Router } from "express";
import { test, TodayRanking, WeekRanking, MonthRanking, AllRanking } from "../../../controller/rank.controller.js";

const router = Router();

router.get("/test", test);
router.get("/today", TodayRanking);
router.get("/thisweek", WeekRanking);
router.get("/thismonth", MonthRanking);
router.get("/alltime", AllRanking);


export default router;
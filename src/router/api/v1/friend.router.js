import { Router } from "express";
import { test, addFriend, getFriends } from "../../../controller/friend.controller.js";

const router = Router();

router.get("/test", test);
router.post("/addreferral", addFriend);
router.post("/get", getFriends);


export default router

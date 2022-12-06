import { Router } from "express";

import {
  getUserById,
  createUser,
  updateUser,
  existUser,
  getUserAll,
  loginAdmin,
  loginUser,
  deleteUser,
  getUserStudentAll,
} from "../../controller/common/userController";

const router = Router();

router.post("/login", loginAdmin);

//register a staff
router.get("/getUserById", getUserById);

//login a admin
router.post("/createUser", createUser);

//get a staff
router.put("/updateUser", updateUser);

//delete a staff
router.delete("/deleteUser", deleteUser);

//delete a staff
router.post("/existUser", existUser);

router.get("/getAllUsers", getUserAll);

router.get("/getAllUserStudentAll", getUserStudentAll);

router.post("/loginUser", loginUser);

export default router;

const express = require("express");
const multer = require("multer");
const router = express.Router();

// Multer config to upload files to 'uploads/' directory
const upload = multer({ dest: 'uploads/' });

const {
  registerController,
  loginController,
  authController,
  registerDoctorController,
  getAllDoctorsControllers,
  appointmentController,
  getAllUserAppointments,
  getDocsController,
  getallnotificationController,
  deleteallnotificationController,
  bookAppointmentController,
  getAppointmentsForUserController
} = require("../controllers/userC");

const authMiddleware = require("../middlewares/authMiddleware");

// ----------------- Public Routes -----------------
router.post("/register", registerController);
router.post("/login", loginController);

// ---------------- Protected Routes ----------------
router.post("/getuserdata", authMiddleware, authController);

router.post("/registerdoc", authMiddleware, registerDoctorController);

router.get("/getalldoctorsu", authMiddleware, getAllDoctorsControllers);

router.post("/getappointment", upload.single("image"), authMiddleware, appointmentController);

router.post("/getallnotification", authMiddleware, getallnotificationController);
router.post("/deleteallnotification", authMiddleware, deleteallnotificationController);

router.get("/getuserappointments", authMiddleware, getAllUserAppointments);
router.get("/getDocsforuser", authMiddleware, getDocsController);

// ---------------- Book Appointment Routes ----------------
router.post(
  "/bookappointment",
  authMiddleware,
  upload.single("document"),
  bookAppointmentController
);

router.get(
  "/getappointments/:userId",
  authMiddleware,
  getAppointmentsForUserController
);

module.exports = router;

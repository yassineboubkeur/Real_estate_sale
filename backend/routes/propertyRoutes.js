
const express = require("express");
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware.js');
const {
  addProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
  getPropertyById
} = require("../controllers/propertyController.js");
const upload = require("../config/multerConfig");

// Route to get all properties
router.get("/all", getAllProperties);
router.get("/:id", getPropertyById);

// Route to add a property
router.post("/add", upload.single('picture'), addProperty);

// Route to update a property (with file upload)
router.put("/update/:id", upload.single('picture'), updateProperty);

// Route to delete a property
router.delete("/delete/:id",  deleteProperty);

module.exports = router;

// const express = require("express");
// const upload = require("../config/multerConfig");
// const { authenticateUser } = require('../middleware/authMiddleware.js');
// const {
//   addProperty,
//   getAllProperties,
//   updateProperty,
//   deleteProperty,
//   getPropertyById
// } = require("../controllers/propertyController.js");

// const router = express.Router();

// // Route to add a property
// // router.post("/add", addProperty);

// // Route to get all properties
// router.get("/all", getAllProperties);
// router.get("/:id", getPropertyById);

// router.post("/add", upload.single('picture'), addProperty);

// // Route to update a property (with file upload)
// router.put("/update/:id",authenticateUser, upload.single('picture'), updateProperty);

// // Route to delete a property
// router.delete("/delete/:id",authenticateUser,  deleteProperty);
// module.exports = router;

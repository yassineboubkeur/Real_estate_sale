
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path"); // Import the path module
const userRoutes = require("./routes/userRoutes.js"); // Import user routes
const propertyRoutes = require("./routes/propertyRoutes.js"); // Import property routes
const contactusRoutes = require("./routes/contactusRoutes.js");

// Load Firebase service account credentials
const serviceAccount = require("./realestate-bc6ed-firebase-adminsdk-k8ni4-3b658ac1de.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Express app
const app = express();

// Define the upload directory path
const uploadDir = path.join(__dirname, "uploads");

// Ensure the 'uploads' directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create directory recursively if it doesn't exist
}

// Middleware to serve static files from 'uploads'
app.use("/uploads", express.static(uploadDir));

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Middleware to parse JSON data
app.use(express.json());

// Use user routes
app.use("/api/users", userRoutes);

// Use property routes
app.use("/api/properties", propertyRoutes);

app.use("/api/", contactusRoutes);

// Firebase token verification endpoint
app.post("/verifyToken", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ status: "error", message: "Token is required." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.json({ status: "success", user: decodedToken });
  } catch (error) {
    console.error("Error verifying token:", error.message);
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

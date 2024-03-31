const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Get the current date and format it (e.g., "2024-03-22")
    const currentDate = new Date().toISOString().split("T")[0];
    // Set the destination folder for uploaded files to include the current date
    const destFolder = `uploads/${currentDate}/`;
    // Create the destination folder if it doesn't exist
    fs.mkdirSync(destFolder, { recursive: true });
    cb(null, destFolder);
  },
  filename: (req, file, cb) => {
    // Extract numeric part from the original file name
    const numericPartMatch = file.originalname.match(/\d+/);
    // Use a default value if no numeric part is found
    const numericPart = numericPartMatch ? numericPartMatch[0] : "default";
    // Preserve the original file extension
    const ext = file.originalname.split(".").pop();
    // Construct the new file name using the numeric part and current timestamp
    cb(null, `${numericPart}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;

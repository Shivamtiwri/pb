const jwt = require("jsonwebtoken");
const secretKey = "hello";
const multer = require("multer");
const path = require("path");

async function Verify(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid token", Response_code: 401 });
  }
  const token = authHeader.split(" ")[1];
  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, secretKey);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return res
        .status(401)
        .json({ error: "Token expired", Response_code: 401 });
    }
    if (!decoded.id) {
      return res
        .status(401)
        .json({ error: "Invalid credentials", Response_code: 403 });
    }
    // Token is valid
    req.userId = decoded.id;
    console.log(decoded.id);
    next();
  } catch (err) {
    // Handle token verification errors
    res
      .status(401)
      .json({ status: false, error: "Token expired", Response_code: 401 });
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/"); // Destination folder for uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); // File name generation with extension
  },
});

// File filter to allow only image files
const fileFilter = function (req, file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!"); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = {
  Verify,
  upload,
};

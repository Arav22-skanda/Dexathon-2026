import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_request, file, callback) => callback(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => callback(null, ["image/png", "image/jpeg"].includes(file.mimetype)),
});

export default upload;

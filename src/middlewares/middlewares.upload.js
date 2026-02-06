import multer from 'multer'
export const validateFileUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload an image" });
  }
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).json({ message: "Invalid file format. Only JPEG, PNG, and WebP are allowed." });
  }

};

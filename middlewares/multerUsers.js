const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/users'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, 'user-' + uniqueSuffix + extension);
  }
});

const fileFilter = (req, file, cb) => {
  const acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (acceptedExtensions.includes(fileExtension)) {
    return cb(null, true);
  }

  cb(new Error('Formato de archivo no permitido. Solo JPG, JPEG, PNG y GIF.'));
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;
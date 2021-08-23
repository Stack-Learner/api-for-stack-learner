/**
 * @All_ABOUT_AWS_S3_AND_MULTER_S3
 */
const { nanoid } = require('nanoid');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-v3');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: './config.env' }); 
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});
const uploadS3 = multer({
  limits: { fileSize: process.env.MAXIMUM_FILE_SIZE_ALLOWED * 1000 * 1000 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      console.log('ekahne error khabe surely 😆😆😆😏');
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    ACL: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, '')
          .toLocaleLowerCase()
          .split(' ')
          .join('-') + nanoid();
      cb(null, fileName + fileExt); //this name will be stored in s3 bucket
      // cb(null, Date.now().toString());
    },
  }),
});
module.exports = uploadS3;

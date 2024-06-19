import multer from 'multer';
import randomstring from 'randomstring';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, randomstring.generate(7) + '-' + Buffer.from(file.originalname, 'latin1').toString('utf8'));
    },
});

const upload = multer({ storage: storage });

export default upload;
